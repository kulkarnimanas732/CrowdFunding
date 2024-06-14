import { Box, Grid, Link } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_USER, isAuthenticated, logout, logoutUser } from "../Login/slice/LoginSlice";

export const links = {
  textDecoration: 'none',
  color: '#02A95C'
}

export default function HeaderJSX() {

  const isAuthenticatedUser = useSelector(isAuthenticated);
  const dispatch = useDispatch();
  const logo = {
    color: '#02A95C',
    marginLeft: '1rem'
  }

  return (
    <Grid>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 -6px 10px 5px rgba(0,0,0,0.5)"
        }}
      >
        <Grid item>
          <h2 style={logo}><Link style={links} href="/">CrowdsClub</Link></h2>
        </Grid>
        <Grid item style={{ display: 'flex', gap: '2rem', marginRight: '1rem' }}>
          <Link href="/" style={links}>Home</Link>
          <Link href="/aboutus" style={links}>About Us</Link>
          <Link href="/contactus" style={links}>Contact Us</Link>
          {isAuthenticatedUser
            ?
            <Link href="/login" style={links} onClick={() => dispatch(logout)}>Logout</Link>
            :
            <>
              <Link href="/login" style={links}>Login</Link>
            </>
          }
        </Grid>
      </Box >
    </Grid >
  );
}
