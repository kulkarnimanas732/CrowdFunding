import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useAppContext } from "../../ReducerSetUp/AppContext";
import { useNavigate } from "react-router-dom";
import { backButtonStyle, pageTitle, updateButtonStyle } from "./EditFormsStyles";
import { useDispatch, useSelector } from "react-redux";
import { ngoCampaignDetails, updatedNGO } from "../../Dashboard/Slice/DashboardSlice";
import FileBase from 'react-file-base64'


export default function EditNgoForm(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { updateButton } = props;

  const { organizationName, setOrganizationName, patientName, setPatientName, hospitalName, setHospitalName, patientInfo, setPatientInfo, patientImages, setPatientImages, solution, setSolution, socialMediaLinks, setSocialMediaLinks, fundingTargetAmount, setFundingTargetAmount, accountNumber, setAccountNumber, bankName, setBankName, ifscCode, setIfscCode } = useAppContext();

  const ngoDetails = useSelector(ngoCampaignDetails);


  const handleUpdate = (data) => {
    dispatch(updatedNGO({ data: data })).then((response) => { if (response.payload.status === 200) { navigate('/dashboard') } })
  }

  const ngoData = {
    _id: ngoDetails ? ngoDetails[0]?._id : null,
    organizationName: organizationName !== null ? organizationName : ngoDetails && ngoDetails[0]?.organizationName,
    patientName: patientName !== null ? patientName : ngoDetails && ngoDetails[0]?.patientName,
    hospitalName: hospitalName !== null ? hospitalName : ngoDetails && ngoDetails[0]?.hospitalName,
    patientInfo: patientInfo !== null ? patientInfo : ngoDetails && ngoDetails[0]?.patientInfo,
    patientImages: patientImages !== null ? patientImages : ngoDetails && ngoDetails[0]?.patientImages,
    socialMediaLinks: socialMediaLinks !== null ? socialMediaLinks : ngoDetails && ngoDetails[0]?.socialMediaLinks,
    solution: solution !== null ? solution : ngoDetails && ngoDetails[0]?.solution,
    bankName: bankName !== null ? bankName : ngoDetails && ngoDetails[0]?.bankName,
    accountNumber: accountNumber !== null ? accountNumber : ngoDetails && ngoDetails[0]?.accountNumber,
    ifscCode: ifscCode !== null ? ifscCode : ngoDetails && ngoDetails[0]?.ifscCode,
    callToAction: fundingTargetAmount !== null ? fundingTargetAmount : ngoDetails && ngoDetails[0]?.callToAction
  }

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        margin: "10px",
        flex: "auto"
      }}
    >
      <h3 style={pageTitle}>Edit Campaign</h3>
      <TextField
        id="outlined-basic"
        label="Organization Name"
        variant="outlined"
        style={{ width: "100%" }}
        value={organizationName !== null ? organizationName : ngoDetails && ngoDetails[0]?.organizationName}
        onChange={(e) => setOrganizationName(e.target.value)}
        InputLabelProps={{
          shrink: (ngoDetails && ngoDetails.length > 0) && true,
        }}
      />
      <TextField
        id="outlined-basic"
        label="Patient Name"
        variant="outlined"
        style={{ width: "100%" }}
        value={patientName !== null ? patientName : ngoDetails && ngoDetails[0]?.patientName}
        onChange={(e) => setPatientName(e.target.value)}
        InputLabelProps={{
          shrink: (ngoDetails && ngoDetails.length > 0) && true,
        }}
      />
      <TextField
        placeholder="Hospital Name"
        label="Hospital Name"
        variant="outlined"
        style={{ width: "100%" }}
        value={hospitalName !== null ? hospitalName : ngoDetails && ngoDetails[0]?.hospitalName}
        onChange={(e) => setHospitalName(e.target.value)}
        InputLabelProps={{
          shrink: (ngoDetails && ngoDetails.length > 0) && true,
        }}
      />
      <TextField
        placeholder="Patient Info"
        label="Patient Info"
        variant="outlined"
        style={{ width: "100%" }}
        value={patientInfo !== null ? patientInfo : ngoDetails && ngoDetails[0]?.patientInfo}
        onChange={(e) => setPatientInfo(e.target.value)}
        InputLabelProps={{
          shrink: (ngoDetails && ngoDetails.length > 0) && true,
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', border: '1px solid', borderRadius: '4px', padding: '5px' }}>
        <div style={{ paddingBottom: '5px' }}>Select Image</div>
        <FileBase type="file" multiple={false} onDone={({ base64 }) => setPatientImages(base64)} />
      </div>
      <TextField
        placeholder="Social Media Link"
        label="Social Media Link"
        variant="outlined"
        style={{ width: "100%" }}
        value={socialMediaLinks !== null ? socialMediaLinks : ngoDetails && ngoDetails[0]?.socialMediaLinks}
        onChange={(e) => setSocialMediaLinks(e.target.value)}
        InputLabelProps={{
          shrink: (ngoDetails && ngoDetails.length > 0) && true,
        }}
      />
      <TextField
        placeholder="Solution"
        label="Solution"
        variant="outlined"
        style={{ width: "100%" }}
        value={solution !== null ? solution : ngoDetails && ngoDetails[0]?.solution}
        onChange={(e) => setSolution(e.target.value)}
        InputLabelProps={{
          shrink: (ngoDetails && ngoDetails.length > 0) && true,
        }}
      />
      <TextField
        placeholder="Bank Name"
        label="Bank Name"
        variant="outlined"
        style={{ width: "100%" }}
        value={bankName !== null ? bankName : ngoDetails && ngoDetails[0]?.bankName}
        onChange={(e) => setBankName(e.target.value)}
        InputLabelProps={{
          shrink: (ngoDetails && ngoDetails.length > 0) && true,
        }}
      />
      <TextField
        placeholder="Account Number"
        label="Account Number"
        variant="outlined"
        type="number"
        style={{ width: "100%" }}
        value={accountNumber !== null ? accountNumber : ngoDetails && ngoDetails[0]?.accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
        InputLabelProps={{
          shrink: (ngoDetails && ngoDetails.length > 0) && true,
        }}
      />
      <TextField
        placeholder="IFSC Code"
        label="IFSC Code"
        variant="outlined"
        style={{ width: "100%" }}
        value={ifscCode !== null ? ifscCode : ngoDetails && ngoDetails[0]?.ifscCode}
        onChange={(e) => setIfscCode(e.target.value)}
        InputLabelProps={{
          shrink: (ngoDetails && ngoDetails.length > 0) && true,
        }}
      />
      <TextField
        id="outlined-basic"
        label="Funding Amount"
        variant="outlined"
        type="number"
        style={{ width: "100%" }}
        value={fundingTargetAmount !== null ? fundingTargetAmount : ngoDetails && ngoDetails[0]?.callToAction}
        onChange={(e) => setFundingTargetAmount(e.target.value)}
        InputLabelProps={{
          shrink: (ngoDetails && ngoDetails.length > 0) && true,
        }}
      />
      {updateButton &&
        <Grid style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button style={backButtonStyle} onClick={() => navigate('/dashboard')}>Back</Button>
          <Button style={updateButtonStyle} onClick={() => handleUpdate(ngoData)}>Update Button</Button>
        </Grid>
      }
    </form>
  );
}
