import React from "react";
import { Box, Grid } from "@mui/material";
import StepperJsx from "./Stepper";
import SignUpImage from "../assets/Signup.png";
import axios from 'axios';

export default function SignUp() {

  return (
    <React.Fragment>
      <Grid style={{ display: "flex", height: '90dvh' }} container lg={12}>
        <Grid item style={{display:'flex', justifyContent:'center', alignItems:'center', padding:'0px 100px 0px 100px'}} lg={12}>
          <Box style={{height:'80dvh', display:'flex', justifyContent:'center', alignItems:'center', width:'100%', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
          <Grid item>
            <img
              src={SignUpImage}
              alt="Sign Up"
              style={{ height: "500px", width: "500px" }}
            ></img>
          </Grid>
          <Grid item>
            <StepperJsx />
          </Grid>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
