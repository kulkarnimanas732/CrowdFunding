// import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { Box, Grid } from "@mui/material";
import FirstStep from "./Forms/FirstStep";
import SecondStep from "./Forms/SecondStep/SecondStep";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { closeAlert, setInfoAlert } from "../Utility/Slice/alertsSlice";
import { useAppContext } from "../ReducerSetUp/AppContext";
const steps = ["Personal Information", "Document Upload"];


function StepperJsx() {
  const [activeStepCount, setActiveStepCount] = React.useState(0);
  const [skip, setSkip] = React.useState(new Set());
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [document, setDocument] = useState(null);
  const [documentType, setDocumentType] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [isEmptyValidations, setIsEmptyValidations] = useState('');
  const dispatch = useDispatch();
  const { isEmailValid, isNumberValid, isPasswordMatched } = useAppContext();

  // useEffect(()=>{
  //   setIsEmptyValidations(true);
  // },[])

  function _renderStepContent(step) {
    switch (step) {
      case 0:
        return <FirstStep setName={setName} name={name} setMobileNumber={setMobileNumber} mobileNumber={mobileNumber} setEmail={setEmail} email={email} setPassword={setPassword} password={password} setType={setType} type={type} setCPassword={setCPassword} cpassword={cpassword} formValidations={formValidations}/>;
      case 1:
        return <SecondStep setDocument={setDocument} document={document} setDocumentType={setDocumentType} documentType={documentType} type={type} formValidations={formValidations}/>;
      default:
        return null;
    }
  }

  const handleStepNext = () => {
    let newSkipped = skip;
    setActiveStepCount((prevActiveStep) => prevActiveStep + 1);
    setSkip(newSkipped);
  };

  const handleStepBack = () => {
    setActiveStepCount((prevActiveStep) => prevActiveStep - 1);
  };

  let formData = {
    name: name,
    email: email,
    password: password,
    mobileNumber: mobileNumber,
    type: type,
    document: document
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/create-user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setSuccess(true);
        setError(null);
        return response;

      } else {
        setSuccess(false);
        setError(response.data.error || 'Something went wrong');
      }
    } catch (err) {
      setError(err.message || 'Network error');
      setSuccess(false);
    }
  };

  const formValidations = () =>{
    // if(name === "" ||  mobileNumber === "" || email === "" || password === "" || cpassword === "" || type === ""){
    //   setIsEmptyValidations(true);
    // }else if(activeStepCount === steps.length - 1){
    //     if(documentType === "" || document === null){
    //       setIsEmptyValidations(true);
    //     }else{
    //       setIsEmptyValidations(false);
    //     }
    // }else{
    //   setIsEmptyValidations(false);
    // }
  }

  const handleStepButtonClick = () => {
    if (activeStepCount === steps.length - 1) {
      if(documentType !== "" && document !== null ){
        handleSubmit().then((response) => {
          console.log('Response', response);
          if (response.status === 200) {
            handleStepNext();
          }
        }
        )
      }else{
        dispatch(setInfoAlert('Please fill all the data and then you can proceed to next steps.'));
        setTimeout(() => {
          dispatch(closeAlert());
        }, 3000);
      }
    } else {
      if(name !== "" &&  mobileNumber !== "" && email !== "" && password !== "" && cpassword !== "" && type !== ""){
        if(!isEmailValid){
          dispatch(setInfoAlert('Email is invalid. Please provide valid email'));
          setTimeout(() => {
            dispatch(closeAlert());
          }, 3000);
        }else if(!isPasswordMatched){
          dispatch(setInfoAlert('Confirm password is not matching with password.'));
          setTimeout(() => {
            dispatch(closeAlert());
          }, 3000);
        }else if(!isNumberValid){
          dispatch(setInfoAlert('Mobile Number is not valid. Please provide valid mobile number'));
          setTimeout(() => {
            dispatch(closeAlert());
          }, 3000);
        }else{
          handleStepNext();
        }
      }else{
        dispatch(setInfoAlert('Please fill all the data and then you can proceed to next steps.'));
        setTimeout(() => {
          dispatch(closeAlert());
        }, 3000);
      }
    };
  }

  return (
    <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
      <div>
        <h2 style={{ color: "green" }}>Crowds Club</h2>
      </div>
      <div>
        <Stepper activeStep={activeStepCount}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <React.Fragment>{_renderStepContent(activeStepCount)}</React.Fragment>
        {activeStepCount === steps.length ? (
          <div style={{ padding: '10px' }}>
            <h3 sx={{ mt: 4, mb: 2 }}>
              Thank you for your interest!
            </h3>
            <h4 sx={{ mt: 4, mb: 2 }}>We appreciate your support. Your account will be verified within 24 hours, allowing you to login and acccess all the features.</h4>
          </div>
        ) : (
          <div>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="primary"
                disabled={activeStepCount === 0}
                onClick={handleStepBack}
                sx={{ mr: 1 }}
              >
                Previous
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={
                () => {
                  handleStepButtonClick()
                }}
                disabled={isEmptyValidations}
                >
                {activeStepCount === steps.length - 1 ? "Done" : "Next"}
              </Button>
            </Box>
          </div>
        )}
      </div>
    </Grid>
  );
}

export default StepperJsx;
