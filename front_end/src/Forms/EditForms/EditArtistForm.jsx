import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useAppContext } from "../../ReducerSetUp/AppContext";
import { useNavigate } from "react-router-dom";
import { backButtonStyle, updateButtonStyle } from "./EditFormsStyles";
import { useDispatch, useSelector } from "react-redux";
import { artistCampaignDetails, updatedArtist } from "../../Dashboard/Slice/DashboardSlice";

export default function EditArtistForm(props) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { updateButton } = props;

  const { artistName, setArtistName, projectTitle, setProjectTitle, artistDescription, setArtistDescription, phoneNumber, setPhoneNumber, socialMediaLinks, setSocialMediaLinks, artistVision, setArtistVision, projectOverview, setProjectOverview, fundingTargetAmount, setFundingTargetAmount, accountNumber, setAccountNumber, bankName, setBankName, ifscCode, setIfscCode } = useAppContext();

  const artistDetails = useSelector(artistCampaignDetails);

  const handleUpdate = (data) => {
    dispatch(updatedArtist({ data: data })).then((response) => { if (response.payload.status === 200) { navigate('/dashboard') } })
  }

  const artistData = {
    _id: artistDetails ? artistDetails[0]?._id : null,
    artistName: artistName !== null ? artistName : artistDetails && artistDetails[0]?.artistName,
    projectTitle: projectTitle !== null ? projectTitle : artistDetails && artistDetails[0]?.projectTitle,
    artistDescription: artistDescription !== null ? artistDescription : artistDetails && artistDetails[0]?.artistDescription,
    phoneNumber: phoneNumber !== null ? phoneNumber : artistDetails && artistDetails[0]?.phoneNumber,
    socialMediaLinks: socialMediaLinks !== null ? socialMediaLinks : artistDetails && artistDetails[0]?.socialMediaLinks,
    artistVision: artistVision !== null ? artistVision : artistDetails && artistDetails[0]?.artistVision,
    projectOverview: projectOverview !== null ? projectOverview : artistDetails && artistDetails[0]?.projectOverview,
    bankName: bankName !== null ? bankName : artistDetails && artistDetails[0]?.bankName,
    accountNumber: accountNumber !== null ? accountNumber : artistDetails && artistDetails[0]?.accountNumber,
    ifscCode: ifscCode !== null ? ifscCode : artistDetails && artistDetails[0]?.ifscCode,
    fundingTargetAmount: fundingTargetAmount !== null ? fundingTargetAmount : artistDetails && artistDetails[0]?.fundingTargetAmount
  }

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        margin: "10px",
        flex: 'auto'
      }}
    >
      <TextField
        id="outlined-basic"
        label="Artist Name"
        variant="outlined"
        style={{ width: "100%" }}
        value={artistName !== null ? artistName : artistDetails[0]?.artistName}
        onChange={(e) => setArtistName(e.target.value)}
        InputLabelProps={{
          shrink: (artistDetails && artistDetails.length > 0) && true,
        }}
      />
      <TextField
        id="outlined-basic"
        label="Project Title"
        variant="outlined"
        style={{ width: "100%" }}
        value={projectTitle !== null ? projectTitle : artistDetails[0]?.projectTitle}
        onChange={(e) => setProjectTitle(e.target.value)}
        InputLabelProps={{
          shrink: (artistDetails && artistDetails.length > 0) && true,
        }}
      />
      <TextField
        placeholder="MultiLine with rows: 2 and rowsMax: 4"
        label="Project Description"
        multiline
        rows={2}
        maxRows={4}
        variant="outlined"
        style={{ width: "100%" }}
        value={artistDescription !== null ? artistDescription : artistDetails[0]?.artistDescription}
        onChange={(e) => setArtistDescription(e.target.value)}
        InputLabelProps={{
          shrink: (artistDetails && artistDetails.length > 0) && true,
        }}
      />
      <TextField
        placeholder="Phone Number"
        label="Phone Number"
        variant="outlined"
        style={{ width: "100%" }}
        value={phoneNumber !== null ? phoneNumber : artistDetails[0]?.phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        InputLabelProps={{
          shrink: (artistDetails && artistDetails.length > 0) && true,
        }}
      />
      <TextField
        placeholder="Social Media Links"
        label="Social Media Links"
        variant="outlined"
        style={{ width: "100%" }}
        value={socialMediaLinks !== null ? socialMediaLinks : artistDetails[0]?.socialMediaLinks}
        onChange={(e) => setSocialMediaLinks(e.target.value)}
        InputLabelProps={{
          shrink: (artistDetails && artistDetails.length > 0) && true,
        }}
      />
      <TextField
        placeholder="MultiLine with rows: 2 and rowsMax: 4"
        label="Artist Vision"
        multiline
        rows={2}
        maxRows={4}
        variant="outlined"
        style={{ width: "100%" }}
        value={artistVision !== null ? artistVision : artistDetails[0]?.artistVision}
        onChange={(e) => setArtistVision(e.target.value)}
        InputLabelProps={{
          shrink: (artistDetails && artistDetails.length > 0) && true,
        }}
      />
      <TextField
        placeholder="MultiLine with rows: 2 and rowsMax: 4"
        label="Project Overview"
        multiline
        rows={2}
        maxRows={4}
        variant="outlined"
        style={{ width: "100%" }}
        value={projectOverview !== null ? projectOverview : artistDetails[0]?.projectOverview}
        onChange={(e) => setProjectOverview(e.target.value)}
        InputLabelProps={{
          shrink: (artistDetails && artistDetails.length > 0) && true,
        }}
      />
      <TextField
        placeholder="Bank Name"
        label="Bank Name"
        variant="outlined"
        style={{ width: "100%" }}
        value={bankName !== null ? bankName : artistDetails && artistDetails[0]?.bankName}
        onChange={(e) => setBankName(e.target.value)}
        InputLabelProps={{
          shrink: (artistDetails && artistDetails.length > 0) && true,
        }}
      />
      <TextField
        placeholder="Account Number"
        label="Account Number"
        variant="outlined"
        type="number"
        style={{ width: "100%" }}
        value={accountNumber !== null ? accountNumber : artistDetails && artistDetails[0]?.accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
        InputLabelProps={{
          shrink: (artistDetails && artistDetails.length > 0) && true,
        }}
      />
      <TextField
        placeholder="IFSC Code"
        label="IFSC Code"
        variant="outlined"
        style={{ width: "100%" }}
        value={ifscCode !== null ? ifscCode : artistDetails && artistDetails[0]?.ifscCode}
        onChange={(e) => setIfscCode(e.target.value)}
        InputLabelProps={{
          shrink: (artistDetails && artistDetails.length > 0) && true,
        }}
      />
      <TextField
        id="outlined-basic"
        label="Funding Amount"
        variant="outlined"
        type="number"
        style={{ width: "100%" }}
        value={fundingTargetAmount !== null ? fundingTargetAmount : artistDetails[0]?.fundingTargetAmount}
        onChange={(e) => setFundingTargetAmount(e.target.value)}
        InputLabelProps={{
          shrink: (artistDetails && artistDetails.length > 0) && true,
        }}
      />
      {updateButton &&
        <Grid style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button style={backButtonStyle} onClick={() => navigate('/dashboard')}>Back</Button>
          <Button style={updateButtonStyle} onClick={() => handleUpdate(artistData)}>Update Button</Button>
        </Grid>
      }
    </form>
  );
}
