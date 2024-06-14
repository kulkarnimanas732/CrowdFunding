import { Grid, Typography } from "@mui/material";
import React from "react";
import AboutUs from "../assets/AboutUs.jpg";

export default function AboutJSX() {
  return (
    <Grid
      style={{
        display: "flex",
        gap: "20px",
        minHeight: "80dvh",
        flexDirection: 'row'
      }}
      container
    >
      <Grid
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: 'row'
          // alignItems: "center",
        }}
      >
        <Grid
          item
          style={{ textAlign: "left", padding:'10px' }}
        >
          <h3 style={{margin:'5px 0px 20px 0px'}}>Learn About Our Company</h3>
          <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
            <Typography>
              Welcome to CrowdsClub, where passion meets purpose. We're not just a crowdfunding platform; we're a community-driven initiative dedicated to empowering NGOs and artists to make a meaningful impact in the world.
            </Typography>
            <Typography>
              At CrowdsClub, we believe in the power of collective action. Every project, every cause, and every artist has a story worth sharing, and we're here to help them amplify their voices. Whether it's raising funds for a vital social cause, supporting budding artists to pursue their dreams, or championing innovative projects that spark positive change, CrowdsClub is the platform where dreams take flight.
            </Typography>
            <Typography>
              What sets us apart? It's our unwavering commitment to fostering connections and driving real, tangible results. We're more than just a fundraising platform; we're a vibrant community of changemakers, supporters, and visionaries who believe in the transformative power of collaboration.
            </Typography>
            <Typography>
              For NGOs, we provide a powerful platform to raise funds, mobilize supporters, and scale their impact. Whether it's providing aid to communities in need, promoting environmental sustainability, or advocating for social justice, CrowdsClub is the catalyst for turning visions into reality.
            </Typography>
            <Typography>
              For artists, we offer a creative sanctuary where talent knows no bounds. From musicians and filmmakers to writers and visual artists, CrowdsClub is the launchpad for turning passion into profession. With our support, artists can pursue their craft with confidence, knowing that they have a dedicated community cheering them on every step of the way.
            </Typography>
            <Typography>
              But CrowdsClub isn't just about raising funds; it's about building relationships that last a lifetime. It's about harnessing the power of the crowd to drive meaningful change and create a better world for all.
            </Typography>
            <Typography>
              Join us in our mission to make a difference, one project at a time. Together, we can build a future where compassion, creativity, and collaboration reign supreme. Welcome to CrowdsClub – where dreams take flight and hearts take flight.
            </Typography>
          </div>
        </Grid>
        <Grid item style={{ padding: "10px" }}>
          <div style={{ height: "350px", background: "pink", width: "600px", borderRadius: '10px' }}>
            <img
              src={AboutUs}
              alt="About Us Image"
              style={{ height: "350px", background: "pink", width: "600px", borderRadius: '10px' }}
            />
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}
