const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

const mailsender = async (options) => {
  try {
    const oAuth2Client = new google.auth.OAuth2({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
    });

    oAuth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

  
    const getAccessToken = async () => {
      try {
        const accessToken = await oAuth2Client.getAccessToken();
        return accessToken;
      } catch (error) {
        console.error('Error getting access token:', error);
        throw error;
      }
    };

    const accessToken = await getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken, 
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.email,
      subject: options.subject,
      html: options.html || '', 
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; 
  }
};

module.exports = mailsender;