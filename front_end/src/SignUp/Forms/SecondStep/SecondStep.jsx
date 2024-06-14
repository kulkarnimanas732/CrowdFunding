import { FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";

import React, { useState } from 'react';
import axios from 'axios';
import FileBase from 'react-file-base64'
export default function SecondStep(props) {
  

  // const [type, setType] = useState('');
  // const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('type', type);
    if (document) {
      formData.append('document', document);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/create-user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(true);
      setError(null);
    } catch (err) {
      setError(err.response.data.error || 'Something went wrong');
      setSuccess(false);
    }
  };

  // const handleOnChangeSelect = (e) => {
  //   settype(e.target.value);
  // }
  const {type, setDocument, document, documentType, setDocumentType, formValidations} = props
  console.log("Type",type);
  return (
    <React.Fragment>
      <Grid lg={12} md={12} sm={12} xs={12}>
        {(type === "investor") && <h2>Investor</h2>}
        {(type === "charity") && <h2>NGO</h2>}
        {(type === "startup") && <h2>Startup</h2>}
        {(type === "artist") && <h2>Artist</h2>}
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            margin: "10px",
          }}
          onSubmit={handleSubmit}
        >
          <FormControl>
            <InputLabel id="demo-multiple-name-label">Select Document Type</InputLabel>
            <Select 
              style={{ width: "100%" }}
              value={documentType}
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              input={<OutlinedInput label="Select Document Type" />}
              onChange={(e) => {setDocumentType(e.target.value);formValidations();}}
            >
              {(type === "investor" || type === "charity" || type === "artist") && (
                <MenuItem value="Aadhar Card / Masked Aadhar Card">Aadhar Card / Masked Aadhar Card</MenuItem>
              )}
              {(type === "investor" || type === "charity" || type === "artist") && (
                <MenuItem value="PAN Card">PAN Card</MenuItem>
              )}
              {type === "investor" && <MenuItem value="Driving Licence">Driving Licence</MenuItem>}
              {type === "startup" && <MenuItem value="Patent">Patent</MenuItem>}
              {type === "startup" && <MenuItem value="Licenese Agreement">Licenese Agreement</MenuItem>}
              {type === "startup" && <MenuItem value="Business License">Business License</MenuItem>}
              {type === "charity" && <MenuItem value="Financial Document">Financial Document</MenuItem>}
            </Select>
          </FormControl>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', border: '1px solid', borderRadius: '4px', padding: '5px' }}>
            <div style={{ paddingBottom: '5px' }}>Select Document</div>
            <FileBase type="file" multiple={false} onDone={({ base64 }) => {setDocument(base64)}} />
          </div>
        </form>
      </Grid>
    </React.Fragment>
  );
}
