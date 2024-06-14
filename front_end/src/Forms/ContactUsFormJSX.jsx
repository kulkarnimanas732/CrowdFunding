import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { updateButtonStyle } from "./EditForms/EditFormsStyles";
import { useAppContext } from "../ReducerSetUp/AppContext";
import axios from 'axios';
import { closeAlert, setErrorAlert, setInfoAlert, setSuccessAlert } from "../Utility/Slice/alertsSlice";
import { useDispatch } from "react-redux";

export default function ContactUsFormJSX() {
  const { name, setName, email, setEmail, message, setMessage, subject, setSubject } = useAppContext();
  const dispatch = useDispatch();
  const [isEmailValid, setIsEmailValid] = useState(null);

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value)
    if (e.target.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setIsEmailValid(true)
    } else {
      setIsEmailValid(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name !== null && email !== null && subject !== null && message !== null) {
      if (!isEmailValid) {
        window.scrollTo(0, 0);
        return dispatch(setInfoAlert('Email is not valid. Please enter valid email.'));
      }
      try {
        const response = await axios.post("http://localhost:5000/api/auth/contactus", {
          name,
          email,
          subject,
          message,
        });
        if (response.status === 201) {
          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
          dispatch(setSuccessAlert("Contact form submitted successfully we will contact you on your email"));
          setTimeout(() => {
            dispatch(closeAlert());
          }, 3000);
          window.scrollTo(0, 0);
        } else {
          const error = response.data.error;
          alert(`Error: ${error}`);
        }
      } catch (error) {
        console.error("Error submitting contact form:", error);
        dispatch(setErrorAlert("An error occurred while submitting the contact form"));
        setTimeout(() => {
          dispatch(closeAlert());
        }, 3000);
        window.scrollTo(0, 0);
      }
    } else {
      dispatch(setInfoAlert('Fill the contact us form and then submit it.'));
      setTimeout(() => {
        dispatch(closeAlert());
      }, 3000);
      window.scrollTo(0, 0);
    }
  };
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        margin: "10px",
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%" }}
        required
      />
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        type="email"
        style={{ width: "100%" }}
        value={email}
        onChange={(e) => handleOnChangeEmail(e)}
        helperText={isEmailValid ? "" : email !== "" ? "Please Enter Valid Email" : ""}
        required
      />
      <TextField
        id="outlined-basic"
        label="Subject"
        variant="outlined"
        style={{ width: "100%" }}
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
      />
      <TextField
        id="outlined-basic"
        label="Message"
        variant="outlined"
        style={{ width: "100%" }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <Button style={updateButtonStyle} type="submit">Send Message</Button>
    </form>
  );
}
