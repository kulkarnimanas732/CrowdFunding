import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";

import React, { useState } from 'react';
import axios from 'axios';
import { useAppContext } from "../../ReducerSetUp/AppContext";

export default function FirstStep(props) {

  const [role, setRole] = React.useState('');
    // const [name, setName] = useState('');
  // const [dob, setDob] = useState('');

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const  { name, setName, email, setEmail, mobileNumber, setMobileNumber, password, setPassword, type, setType, cpassword, setCPassword } = props
  const { setIsEmailValid, isEmailValid, isNumberValid, setIsNumberValid, isPasswordMatched, setIsPasswordMatched } = useAppContext();


  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append('name', name);
  //   // formData.append('dob', dob);
  //   formData.append('mobileNumber', mobileNumber);
  //   formData.append('email', email);
  //   formData.append('password', password);
  //   formData.append('type', type);
  //   if (document) {
  //     formData.append('document', document);
  //   }

  //   try {
  //     const response = await axios.post('http://localhost:5000/api/auth/create-user', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     setSuccess(true);
  //     setError(null);
  //     console.log(response.data);
  //   } catch (err) {
  //     setError(err.response.data.error || 'Something went wrong');
  //     setSuccess(false);
  //   }
  // };

  const handleOnChangeSelect = (e) =>{
    setRole(e.target.value);
  }


  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value)
    if (e.target.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setIsEmailValid(true)
    } else {
      setIsEmailValid(false)
    }
  }

  const handleOnChangeNumber = (e) => {
    setMobileNumber(e.target.value)
    if (e.target.value.match(/^[0]?[789]\d{9}$/)) {
      setIsNumberValid(true)
    } else {
      setIsNumberValid(false)
    }
  }

  const handleOnConfirmPass = (e) => {
    setCPassword(e.target.value)
    if (password === e.target.value) {
      setIsPasswordMatched(true)
    } else {
      setIsPasswordMatched(false)
    }
  }

  return (
    <div>
      <Grid lg={12} md={12} sm={12} xs={12}>
        {/* <h2>Crowd Funding</h2> */}
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
            label="Name"
            variant="outlined"
            style={{ width: "100%" }}
            value={name}
            onChange={(e) => {setName(e.target.value);}}
            required
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            style={{ width: "100%" }}
            value={email}
            onChange={(e) => {handleOnChangeEmail(e);}}
            helperText={ isEmailValid ? "" : email !== "" ? "Please Enter Valid Email" : "" }
            required
          />
          <TextField
            id="outlined-basic"
            label="Mobile Number"
            variant="outlined"
            style={{ width: "100%" }}
            value={mobileNumber}
            onChange={(e) => {handleOnChangeNumber(e);}}
            helperText={ isNumberValid ? "" : mobileNumber !== "" ? "Please Enter Valid Mobile Number" : "" }
            required
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            style={{ width: "100%" }}
            value={password}
            onChange={(e) => {setPassword(e.target.value);}}
            type="password"
            required
          />
          <TextField
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            style={{ width: "100%" }}
            value={cpassword}
            type="password"
            onChange={(e) => {handleOnConfirmPass(e);}}
            helperText={ isPasswordMatched ? "" : (password !== "" && cpassword !== "") ? "Password and Confirm Password are not matching" : "" }
            required
          />
          <FormControl style={{ width: "100%" }}>
            <InputLabel id="demo-multiple-name-label" required>Select Role</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              
            //  value={role}
              value={type} 
              onChange={(e) => {setType(e.target.value)}}
              input={<OutlinedInput label="Select Role" />}
              // onChange={(e) => handleOnChangeSelect(e)}
              required
            >
              <MenuItem value="charity">NGO</MenuItem>
              {/* <MenuItem value="startup">Start Up</MenuItem> */}
              <MenuItem value="investor">Donar</MenuItem>
              <MenuItem value="artist">Artist</MenuItem>
            </Select>
          </FormControl>
        </form>
      </Grid>
    </div>
  );
}


// import React, { useState } from 'react';
// import axios from 'axios';

// const CreateUserForm = () => {
//   const [name, setName] = useState('');
//   // const [dob, setDob] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [type, setType] = useState('');
//   const [document, setDocument] = useState(null);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('name', name);
//     // formData.append('dob', dob);
//     formData.append('mobileNumber', mobileNumber);
//     formData.append('email', email);
//     formData.append('password', password);
//     formData.append('type', type);
//     if (document) {
//       formData.append('document', document);
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/create-user', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setSuccess(true);
//       setError(null);
//       console.log(response.data);
//     } catch (err) {
//       setError(err.response.data.error || 'Something went wrong');
//       setSuccess(false);
//     }
//   };

//   return (
//     <div>
//       {error && <p>{error}</p>}
//       {success && <p>User created successfully!</p>}
//       <form onSubmit={handleSubmit} style={{display:'inline'}}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         {/* <input
//           type="date"
//           placeholder="Date of Birth"
//           value={dob}
//           onChange={(e) => setDob(e.target.value)}
//         /> */}
//         <input
//           type="text"
//           placeholder="Mobile Number"
//           value={mobileNumber}
//           onChange={(e) => setMobileNumber(e.target.value)}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <select value={type} onChange={(e) => setType(e.target.value)}>
//           <option value="">Select Type</option>
//           <option value="investor">Investor</option>
//           <option value="startup">Startup</option>
//           <option value="charity">Charity</option>
//           <option value="artist">Artist</option>
//         </select>
//         <input
//           type="file"
//           accept=".pdf,.jpg,.png"
//           onChange={(e) => setDocument(e.target.files[0])}
//         />
//         <button type="submit">Create User</button>
//       </form>
//     </div>
//   );
// };

// export default CreateUserForm;