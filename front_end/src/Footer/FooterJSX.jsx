import { Grid, Link, Typography } from "@mui/material";
import React from "react";
import { links } from "../Header/HeaderJSX";

export default function FooterJSX() {
  return (
    <Grid container style={{ backgroundColor: "black", padding: '10px', color: "white", textAlign: 'left', display: 'flex', justifyContent: 'space-evenly', alignContent: 'center' }} columnSpacing={2}>
      <Grid item>
        <h3>CrowdsClub</h3>
        <Typography>Bring Your Innovative Ideas to Life.</Typography>
        <Typography>Fund innovative ideas. Rally backers.</Typography>
        <Typography>Ignite change.</Typography>
        <Typography>It all starts with a single vision at Crowdsclub</Typography>
      </Grid>
      <Grid item style={{ display: 'flex', flexDirection: 'column' }}>
        <h3>Company</h3>
        <Link href="/" style={links}>
          Home
        </Link>
        <Link href="/aboutus" style={links}>
          About Us
        </Link>
        <Link href="/contactus" style={links}>
          Contact Us
        </Link>
      </Grid>
      <Grid item>
        <h3>Fundraising</h3>
        <Typography>Charity</Typography>
        <Typography>Artist</Typography>
      </Grid>
      <Grid item>
        <h3>Contact</h3>
        <Typography>+91 7854296315</Typography>
        <Typography>crowdsclub@gmail.com</Typography>
        <Typography> 123 Main Street, Anytown, India, 123456</Typography>
      </Grid>
    </Grid>
  );
}
