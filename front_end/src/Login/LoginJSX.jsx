import { Box, Button, Grid, Link, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import LoginImage from '../assets/login.png'
import { useDispatch, useSelector } from "react-redux";
import { isLoading, loginUser } from "./slice/LoginSlice";
import LoaderJSX from "../Loader/LoaderJSX";
import { closeAlert, setErrorAlert, setInfoAlert } from "../Utility/Slice/alertsSlice";

export default function LoginJSX() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(null);
  const dispatch = useDispatch();

  const loading = useSelector(isLoading);

  const handleLogin = (email, password) => {
    if (email !== "" && password !== "" && isEmailValid) {
      dispatch(loginUser({ username: email, password: password })).then((response) => {
        if (response.payload.status === 200) {
          navigate('/dashboard')
        }
      })
    }else{
      dispatch(setInfoAlert("Please Enter Valid Credentials."));
      setTimeout(() => {
        dispatch(closeAlert());
      }, 3000);
    }
  };

  const handleOnChangePass = (e) => {
    setPassword(e.target.value)
  }

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value)
    if (e.target.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      console.log("In If")
      setIsEmailValid(true)
    } else {
      setIsEmailValid(false)
    }
  }


  return (
    <>
      {loading ? (
        <LoaderJSX />
      ) : (
        <React.Fragment>
          <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: "center", height: '80dvh', padding:'0px 100px 0px 100px' }}>
            <Box style={{ display:'flex', justifyContent:'center', alignItems:'center', width:'100%', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
              <Grid item>
                <div>
                  <img src={LoginImage} alt="Login Image" style={{ height: '500px', width: '500px' }}></img>
                </div>
              </Grid>
              <Grid item style={{display:'flex', justifyContent:'flex-start',alignItems:'flex-start', flexDirection:'column'}}>
                <h1 style={{marginLeft:'10px', color:'#02A95C'}}>Hello, User</h1>
                <Box
                  style={{
                    width: '400px'
                  }}
                >
                  <form
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      margin: "10px",
                    }}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      type="email"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={email}
                      onChange={(e) => handleOnChangeEmail(e)}
                      helperText={ isEmailValid ? "" : email !== "" ? "Please Enter Valid Email" : "" }
                      required
                    />
                    <TextField
                      id="outlined-basic"
                      label="Password"
                      type="password"
                      variant="outlined"
                      style={{ width: "100%" }}
                      value={password}
                      onChange={(e) => handleOnChangePass(e)}
                      required
                    />
                    <Button style={{ backgroundColor: '#02A95C', color: 'white' }} onClick={() => handleLogin(email, password)}>Login</Button>
                    <Link href="/signup" style={{ textDecoration: 'none' }}>Sign Up?</Link>
                  </form>
                </Box>
              </Grid>
            </Box>
          </Grid>
        </React.Fragment>
      )}</>
  );
}
