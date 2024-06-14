import { Grid, Typography } from "@mui/material";
import React from "react";
import ContactUsFormJSX from "../Forms/ContactUsFormJSX";
import ContactUsImage from "../assets/ContactUs.jpg";
import { pageTitle } from "../Dashboard/CampaignDetails/CampaignDetailsStyles";

export default function ContactUsJSX() {
  return (
    <Grid lg={12} container >
      <Grid item lg={12}>
        <div
          style={{ height: "400px", width: "100%", backgroundColor: "pink" }}
        >
          <img
            src={ContactUsImage}
            alt="Contact Us"
            style={{ height: "400px", width: "100%", backgroundColor: "pink" }}
          ></img>
        </div>
      </Grid>
      <Grid
        style={{
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
          padding: '20px'
        }}
        lg={12}
        item
        rowGap={1}
      >
        <Grid style={{ textAlign: 'left' }} lg={6}>
          <Typography style={{display:'flex', gap:'10px', flexDirection:'column'}}>
            <Typography>
            <b>Contact US</b><br />
            We're here to help you every step of the way. Whether you have a question, need assistance, or just want to say hello, we're always eager to hear from you. Here's how you can get in touch:
            </Typography>
            <Typography>
              <b>Customer Support:</b><br />
              Have a question about using CrowdsClub? Need help with your account or a specific project? Our dedicated customer support team is here to assist you. Reach out to us at <b style={pageTitle}>support@crowdsclub.com</b> and we'll get back to you as soon as possible.
            </Typography>

            <Typography>
              <b>Partnerships and Collaborations:</b><br />
              Interested in partnering with CrowdsClub or collaborating on a project? We're always open to new opportunities to expand our impact and reach. Get in touch with our partnerships team at <b style={pageTitle}>partnerships@crowdsclub.com</b> to explore how we can work together.
            </Typography>

            <Typography>
              <b>Media and Press Inquiries:</b><br />
              For media inquiries, press releases, or interview requests, please contact our media relations team at <b style={pageTitle}>media@crowdsclub.com</b>. We're happy to provide information, quotes, or arrange interviews to share our story with the world.
            </Typography>

            <Typography>
              <b>Feedback and Suggestions:</b><br />
              We value your feedback and are constantly striving to improve the CrowdsClub experience. If you have any suggestions, ideas, or feedback you'd like to share with us, please email us at <b style={pageTitle}>feedback@crowdsclub.com</b>. Your input helps us make CrowdsClub better for everyone.
            </Typography>

            <Typography>
              <b>General Inquiries:</b><br />
              For all other inquiries or if you're not sure who to contact, you can reach us at <b style={pageTitle}>info@crowdsclub.com</b>. We'll make sure your message gets to the right person and that you receive a prompt response.
            </Typography>
          </Typography>
        </Grid>
        <Grid lg={6}>
          <ContactUsFormJSX />
          <Grid style={{ display: "flex", justifyContent: "space-evenly", margin: '1rem' }} lg={12}>
            <Grid item lg={4}>
              <h3>About Company</h3>
              <div>
                CrowdsClub is a platform dedicated to empowering visionaries from
                startups, artists, and charities to connect with backers and
                transform innovative ideas into impactful realities.
              </div>
            </Grid>
            <Grid item lg={4} >
              <h3>Address</h3>
              <div>123 Main Street, Anytown, India, 12345</div>
            </Grid>
            <Grid item lg={4}>
              <h3>Help & Support</h3>
              <div>+91 7854296315</div>
              <div>crowdsclub@gmail.com</div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
