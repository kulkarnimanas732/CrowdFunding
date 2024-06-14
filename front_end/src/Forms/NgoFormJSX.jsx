import { TextField, } from "@mui/material";
import React from "react";
import { useAppContext } from "../ReducerSetUp/AppContext";
import FileBase from 'react-file-base64';

export default function NgoFormJSX() {
  const { organizationName, setOrganizationName, patientName, setPatientName, hospitalName, setHospitalName, patientInfo, setPatientInfo, setPatientImages, solution, setSolution, socialMediaLinks, setSocialMediaLinks, fundingTargetAmount, setFundingTargetAmount, accountNumber, setAccountNumber, bankName, setBankName, ifscCode, setIfscCode } = useAppContext();

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        margin: "10px",
        flex: "auto",
        width: '100%'
      }}
    >
      <TextField
        id="outlined-basic"
        label="Organization Name"
        variant="outlined"
        style={{ width: "100%" }}
        value={organizationName}
        onChange={(e) => setOrganizationName(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="Patient Name"
        variant="outlined"
        style={{ width: "100%" }}
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
      />
      <TextField
        placeholder="Hospital Name"
        label="Hospital Name"
        variant="outlined"
        style={{ width: "100%" }}
        value={hospitalName}
        onChange={(e) => setHospitalName(e.target.value)}
      />
      <TextField
        placeholder="Patient Info"
        label="Patient Info"
        variant="outlined"
        style={{ width: "100%" }}
        value={patientInfo}
        onChange={(e) => setPatientInfo(e.target.value)}
      />
      <div style={{display:'flex', flexDirection:'column', justifyContent:'flex-start', alignItems:'flex-start', border:'1px solid', borderRadius:'4px', padding:'5px'}}>
        <div style={{paddingBottom:'5px'}}>Select Image</div>
        <FileBase type="file" multiple={false} onDone={({ base64 }) => setPatientImages(base64)} />
        
      </div>
      <TextField
        placeholder="Social Media Link"
        label="Social Media Link"
        variant="outlined"
        style={{ width: "100%" }}
        value={socialMediaLinks}
        onChange={(e) => setSocialMediaLinks(e.target.value)}
      />
      <TextField
        placeholder="Solution"
        label="Solution"
        variant="outlined"
        style={{ width: "100%" }}
        value={solution}
        onChange={(e) => setSolution(e.target.value)}
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
