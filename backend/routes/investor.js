const express = require("express");
const router = express.Router();
const Order = require("../models/OrderSchema");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Razorpay = require("razorpay");
const CharityCampaign=require("../models/CharityCampaign");
const ArtistProject=require("../models/ArtistProject");
const { body, param, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const multer = require('multer');
require('dotenv').config()
const app = express();
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Middleware to handle JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      return res.status(400).send({ success: false, message: 'Invalid JSON payload' });
  }
  next();
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only .png, .jpg and .jpeg formats are allowed!'));
  }
});
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

router.post(
  '/create-charity-campaign',
  fetchuser,

  [
    body('organizationName').notEmpty(),
    body('patientName').notEmpty(),
    body('hospitalName').notEmpty(),
    body('patientInfo').isLength({ min: 20}),
    body('patientImages').notEmpty(),
    body('socialMediaLinks').notEmpty(),
    body('solution').isLength({ min: 20}),
    body('callToAction').notEmpty().isFloat({ gt: 0 }),
    body('accountNumber').notEmpty().isNumeric(),
    body('ifscCode').notEmpty(),
    body('bankName').notEmpty(),
    body('amount').optional().isFloat({ gt: 0 })
  ],
  validateRequest,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const {
        projectId,
        organizationName,
        patientName,
        hospitalName,
        patientInfo,
        patientImages,
        socialMediaLinks,
        solution,
        callToAction,
        accountNumber,
        ifscCode,
        bankName,
        amount
      } = req.body;

      // Extract authenticated user's ID
      const createdBy = req.user.userId;

      // If projectId is provided, handle funding update
      if (projectId && amount !== undefined) {
        const project = await CharityCampaign.findById(projectId);
        if (!project) {
          return res.status(404).json({ success: false, message: 'Project not found' });
        }

        project.amountRaised.push({ investorId: createdBy, amount });

        const totalAmountRaised = project.amountRaised.reduce((sum, inv) => sum + inv.amount, 0);
        if (totalAmountRaised > project.callToAction) {
          return res.status(409).send('You are exceeding the funding amount');
        }

        await project.save();
        return res.json({ success: true, project });
      }

      // Handle new charity campaign creation
      let parsedCallToAction = 0;
      if (callToAction) {
        parsedCallToAction = parseFloat(callToAction.toString().replace(/,/g, ''));
        if (isNaN(parsedCallToAction)) {
          return res.status(400).json({ success: false, message: 'Invalid call to action amount' });
        }
      }

      const charityCampaign = new CharityCampaign({
        organizationName,
        patientName,
        hospitalName,
        patientInfo,
        patientImages ,
        socialMediaLinks,
        solution,
        callToAction: parsedCallToAction,
        amountRaised: [],
        createdBy,
        accountNumber,
        ifscCode,
        bankName
      });

      await charityCampaign.save();
      return res.json({ success: true, charityCampaign });
    } catch (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    }
  }
);
router.get('/fetch-charity-campaigns', async (req, res) => {
  try {
    let campaigns = await CharityCampaign.find();
    return res.status(200).json({ success: true, data: campaigns });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

router.get('/fetch-charity-campaign', fetchuser, async (req, res) => {
  try {
    const userId = req.user.userId;
    const campaigns = await CharityCampaign.find({ createdBy: userId });
    return res.status(200).json({ success: true, data: campaigns });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

router.put(
  '/update-charity-campaign/:id',
  // upload.single('patientImages'),  // or upload.array('patientImages') if multiple files
  [
    param('id').isMongoId(),
    body('organizationName').optional(),
    body('patientName').optional(),
    body('hospitalName').optional(),
    body('patientImages').optional(),
    body('patientInfo').optional().isLength({ min: 20 }),
    body('socialMediaLinks').optional(),
    body('patientImages').optional(),
    body('solution').optional().isLength({ min: 20 }),
    body('callToAction').optional().isFloat({ gt: 0 }),
    body('accountNumber').optional().isNumeric(),
    body('ifscCode').optional(),
    body('bankName').optional(),
    body('amount').optional().isFloat({ gt: 0 })
  ],
  validateRequest,
  async (req, res) => {
    try {
      const campaignId = req.params.id;
      const updateFields = req.body;

      // Handle file path for patientImages
      if (req.file) {
        updateFields.patientImages = req.file.path;
      }

      const isSingleUpdate = Object.keys(updateFields).length === 1;
      
  
      let campaign;
      if (isSingleUpdate) {
        campaign = await CharityCampaign.findByIdAndUpdate(campaignId, updateFields, { new: true });
      } else {
        campaign = await CharityCampaign.findOneAndUpdate({ _id: campaignId }, updateFields, { new: true });
      }

      if (!campaign) {
        return res.status(404).json({ success: false, message: 'Charity Campaign not found' });
      }

      return res.json({ success: true, campaign });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Internal Server Error');
    }
  }
);


router.delete(
  '/delete-charity-campaign/:id',
  [
    param('id').isMongoId().withMessage('Invalid campaign ID')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const campaign = await CharityCampaign.findOneAndDelete({ _id: req.params.id });
      if (!campaign) {
        return res.status(404).json({ success: false, message: 'Charity Campaign not found' });
      }
      return res.json({ success: true, message: 'Charity Campaign deleted successfully' });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Internal Server Error');
    }
  }
);


router.get('/charity-campaign-details/:id', async (req, res) => {
  try {
    const campaign = await CharityCampaign.findById(req.params.id).populate('amountRaised.investorId', 'name email');

    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }

    const totalAmountRaised = campaign.amountRaised.reduce((sum, inv) => sum + inv.amount, 0);
    const investorDetails = campaign.amountRaised.map(inv => ({
      investorId: inv.investorId._id,
      investorName: inv.investorId.name,
      investorEmail: inv.investorId.email,
      amount: inv.amount,
      date: inv.date

    }));

    return res.json({ success: true, totalAmountRaised, investorDetails });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});



router.post(
  '/submit-artist-project',
  fetchuser,
  [
    body('artistName').notEmpty(),
    body('projectTitle').notEmpty(),
    body('artistDescription').notEmpty().isLength({ min: 20 }),
    body('phoneNumber').isMobilePhone(),
    body('socialMediaLinks').notEmpty(),
    body('artistVision').notEmpty().isLength({ min: 20 }),
    body('projectOverview').notEmpty().isLength({ min: 20 }),
    body('fundingTargetAmount').isFloat({ gt: 0 }),
    body('accountNumber').notEmpty().isNumeric(),
    body('ifscCode').notEmpty(),
    body('bankName').notEmpty(),
    body('amount').optional().isFloat({ gt: 0 })
  ],
  validateRequest,
 async (req, res) => {
  try {
    const {
      projectId,
      artistName,
      projectTitle,
      artistDescription,
      phoneNumber,
      socialMediaLinks,
      artistVision,
      projectOverview,
      fundingTargetAmount,
      accountNumber,
      ifscCode,
      bankName,
      amount
    } = req.body;

    // Extract authenticated user's ID
    const createdBy = req.user.userId;
 

    // If projectId is provided, handle funding update
    if (projectId && amount !== undefined) {
      const project = await ArtistProject.findById(projectId);
      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }

      project.amountRaised.push({ investorId: createdBy, amount });

      const totalAmountRaised = project.amountRaised.reduce((sum, inv) => sum + inv.amount, 0);
      if (totalAmountRaised > project.fundingTargetAmount) {
        return res.status(409).send('You are exceeding the funding amount');
      }

      await project.save();
      return res.json({ success: true, project });
    }

    // Handle new project creation
    let parsedFundingTargetAmount = 0;
    if (fundingTargetAmount) {
      parsedFundingTargetAmount = parseFloat(fundingTargetAmount.toString().replace(/,/g, ''));
      if (isNaN(parsedFundingTargetAmount)) {
        return res.status(400).json({ success: false, message: 'Invalid funding target amount' });
      }
    }

    const artistProject = new ArtistProject({
      artistName,
      projectTitle,
      artistDescription,
      phoneNumber,
      socialMediaLinks,
      artistVision,
      projectOverview,
      fundingTargetAmount: parsedFundingTargetAmount,
      amountRaised: [],
      createdBy,
      accountNumber,
      ifscCode,
      bankName
    });

    await artistProject.save();
    return res.json({ success: true, artistProject });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});
router.put(
  '/update-artist-project/:id',
  [
    param('id').isMongoId(),
    body('artistName').optional(),
    body('projectTitle').optional(),
    body('artistDescription').optional().isLength({ min: 20 }),
    body('phoneNumber').optional().isMobilePhone(),
    body('socialMediaLinks').optional(),
    body('artistVision').optional().isLength({ min: 20 }),
    body('projectOverview').optional().isLength({ min: 20 }),
    body('fundingTargetAmount').isFloat({ gt: 0 }),
    body('accountNumber').optional().isNumeric(),
    body('ifscCode').optional(),
    body('bankName').optional(),
    body('amount').optional().isFloat({ gt: 0 })
  ],
  validateRequest,
  async (req, res) => {
    try {
      const campaignId = req.params.id;
      const updateFields = req.body;

      // Check if it's a single update or multiple updates
      const isSingleUpdate = Object.keys(updateFields).length === 1;

      let project;
      if (isSingleUpdate) {
        // Single update
        const [fieldName, fieldValue] = Object.entries(updateFields)[0];
        project = await ArtistProject.findByIdAndUpdate(
          campaignId,
          { [fieldName]: fieldValue },
          { new: true }
        );
      } else {
        // Multiple updates
        project = await ArtistProject.findOneAndUpdate(
          { _id: campaignId },
          updateFields,
          { new: true }
        );
      }

      if (!project) {
        return res.status(404).json({ success: false, message: 'Artist Project not found' });
      }

      return res.json({ success: true, project });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Internal Server Error');
    }
  }
);

router.delete('/delete-artist-project/:id', async (req, res) => {
  try {
    const project = await ArtistProject.findOneAndDelete({ _id: req.params.id });
    if (!project) {
      return res.status(404).json({ success: false, message: 'Artist Project not found' });
    }
    return res.json({ success: true, message: 'Artist Project deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Internal Server Error');
  }
});

router.get("/fetch-artist-projects", async (req, res) => {
  try {
    let projects = await ArtistProject.find();
    return res.status(200).json({ success: true, data: projects });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Fetching Artist Project by ID
router.get("/fetch-artist-project",fetchuser, async (req, res) => {
  try {
    const userId = req.user.userId;
    const project = await ArtistProject.find({ createdBy: userId });
    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.get('/project-details/:id', async (req, res) => {
  try {
    const project = await ArtistProject.findById(req.params.id).populate('amountRaised.investorId', 'name email');

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const totalAmountRaised = project.amountRaised.reduce((sum, inv) => sum + inv.amount, 0);
    const investorDetails = project.amountRaised.map(inv => ({
      investorId: inv.investorId._id,
      investorName: inv.investorId.name,
      investorEmail: inv.investorId.email,
      amount: inv.amount,
      date: inv.date
    }));

    return res.json({ success: true,  totalAmountRaised, investorDetails });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

router.get("/donar-donations/:id", async (req, res) => {
  try {
    const investorId = req.params.id;
    const orders = await Order.find({ investor_id: investorId });

    const enrichedOrders = await Promise.all(
      orders.map(async (order) => {
        let projectDetails = {};

        if (order.transactionType === 'charity') {
          const charityCampaign = await CharityCampaign.findById(order.transactionId);
          if (charityCampaign) {
            projectDetails = {
              projectTitle: charityCampaign.organizationName,
              projectOverview: charityCampaign.patientInfo,
              fundingTargetAmount: charityCampaign.callToAction,
            };
          }
        } else if (order.transactionType === 'artist') {
          const artistProject = await ArtistProject.findById(order.transactionId);
          if (artistProject) {
            projectDetails = {
              projectTitle: artistProject.projectTitle,
              projectOverview: artistProject.projectOverview,
              fundingTargetAmount: artistProject.fundingTargetAmount,
            };
          }
        }

        return {
          orderId: order._id,
          amount: order.amount,
          transactionType: order.transactionType,
          transactionId: order.transactionId,
          projectDetails,
        };
      })
    );

    res.json({ success: true, enrichedOrders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: error.message });
  }
});


module.exports = router;
