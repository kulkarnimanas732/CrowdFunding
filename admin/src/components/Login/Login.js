import { Box, Button, Grid, Link, TextField } from "@mui/material";
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth1/login', formData);
      console.log(response.data);

      if (response.data.token) {
        // Login successful, handle token storage and navigate to dashboard
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard'); // Replace '/dashboard' with the appropriate path for your dashboard
      } else {
        setError(response.data.error || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to log in');
    }
  };

  return (
    <React.Fragment>
      <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: "center", height: '100dvh' }}>
        <Grid item>
          <Box
            style={{
              margin: '10px',
              padding: '20px',
              width: '500px',
              display: 'flex', justifyContent: 'center', alignItems: "center",
              flexDirection: 'column',
              boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
            }}
          >
            <h3 style={{ color: '#02A95C' }}>Admin Login</h3>
            {error && <p>{error}</p>}
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                margin: "10px",
                width: '100%',
                alignItems: 'center'
              }}
              onSubmit={handleSubmit}
            >
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
                fullWidth
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
                fullWidth
              />
              <Button style={{ backgroundColor: '#02A95C', color: 'white' }} type="submit" fullWidth>Login</Button>
              <Link style={{ textDecoration: 'none', marginTop: '10px' }} href="/">Sign Up?</Link>
            </form>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}


