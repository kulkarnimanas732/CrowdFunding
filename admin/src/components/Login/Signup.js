import { Box, Button, Grid, Link, TextField } from "@mui/material";
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleNavigateToLogin = () => {
    navigate('/login');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth1/create-user', formData);
      console.log(response.data);

      if (response.data.success) {
        // User created successfully, navigate to login page
        navigate('/login');
      } else {
        setError(response.data.error || 'Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setError('Failed to create user');
    }
  };

  return (

    <React.Fragment>
    <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: "center", height: '100dvh' }}>
      <Grid item>
        <div>
          {/* <img src={LoginImage} alt="Login Image" style={{ height: '500px', width: '500px' }}></img> */}
        </div>
      </Grid>
      <Grid item>
        <Box
          style={{
            margin: '10px',
            padding: '20px',
            width: '500px',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'column',
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
          }}
        >
          <h3 style={{color:'#02A95C'}}>Admin Sign Up</h3>
          {error && <p>{error}</p>}
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              margin: "10px",
              width:'100%',
              alignItems:'center'
            }}
            onSubmit={handleSubmit}
          >
            <TextField
              id="outlined-basic"
              label="Name"
              type="name"
              variant="outlined"
              name="name"
              style={{ width: "100%" }}
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              id="outlined-basic"
              label="Email"
              type="email"
              variant="outlined"
              name="email"
              style={{ width: "100%" }}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              name="password"
              style={{ width: "100%" }}
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Button style={{ backgroundColor: '#02A95C', color: 'white' }} type="submit" fullWidth>Create User</Button>
            <Link style={{ textDecoration:'none', marginTop: '10px' }} href="/login">Go to Login</Link>
          </form>
        </Box>
      </Grid>
    </Grid>
  </React.Fragment>
  );
};

export default CreateUser;