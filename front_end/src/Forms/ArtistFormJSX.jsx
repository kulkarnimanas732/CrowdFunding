import { Button, TextField, TextareaAutosize } from "@mui/material";
import React from "react";
import { useAppContext } from "../ReducerSetUp/AppContext";

export default function ArtistFormJSX() {

  const { artistName, setArtistName, projectTitle, setProjectTitle, artistDescription, setArtistDescription, phoneNumber, setPhoneNumber, socialMediaLinks, setSocialMediaLinks, artistVision, setArtistVision, projectOverview, setProjectOverview, fundingTargetAmount, setFundingTargetAmount, accountNumber, setAccountNumber, bankName, setBankName, ifscCode, setIfscCode } = useAppContext();
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        margin: "10px",
        flex: 'auto',
        width: '100%'
      }}
    >
      <TextField
        id="outlined-basic"
        label="Artist Name"
        variant="outlined"
        style={{ width: "100%" }}
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Project Title"
        variant="outlined"
        style={{ width: "100%" }}
        value={projectTitle}
        onChange={(e) => setProjectTitle(e.target.value)}
      />
      <TextField
        placeholder="MultiLine with rows: 2 and rowsMax: 4"
        label="Project Description"
        multiline
        rows={2}
        maxRows={4}
        variant="outlined"
        style={{ width: "100%" }}
        value={artistDescription}
        onChange={(e) => setArtistDescription(e.target.value)}
      />
      <TextField
        placeholder="Phone Number"
        label="Phone Number"
        variant="outlined"
        style={{ width: "100%" }}
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <TextField
        placeholder="Social Media Links"
        label="Social Media Links"
        variant="outlined"
        style={{ width: "100%" }}
        value={socialMediaLinks}
        onChange={(e) => setSocialMediaLinks(e.target.value)}
      />
      <TextField
        placeholder="MultiLine with rows: 2 and rowsMax: 4"
        label="Artist Vision"
        multiline
        rows={2}
        maxRows={4}
        variant="outlined"
        style={{ width: "100%" }}
        value={artistVision}
        onChange={(e) => setArtistVision(e.target.value)}
      />
      <TextField
        placeholder="MultiLine with rows: 2 and rowsMax: 4"
        label="Project Overview"
        multiline
        rows={2}
        maxRows={4}
        variant="outlined"
        style={{ width: "100%" }}
        value={projectOverview}
        onChange={(e) => setProjectOverview(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Bank Name"
        variant="outlined"
        style={{ width: "100%" }}
        value={bankName}
        onChange={(e) => setBankName(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Account Number"
        variant="outlined"
        type="number"
        style={{ width: "100%" }}
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="IFSC Code"
        variant="outlined"
        style={{ width: "100%" }}
        value={ifscCode}
        onChange={(e) => setIfscCode(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Funding Amount"
        variant="outlined"
        type="number"
        style={{ width: "100%" }}
        value={fundingTargetAmount}
        onChange={(e) => setFundingTargetAmount(e.target.value)}
      />
    </form>
  );
}
