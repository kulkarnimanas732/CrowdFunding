import { Button, Grid, IconButton, Link, Typography } from "@mui/material";
import React,{ useEffect,useState} from "react";
import { backButtonStyle, updateButtonStyle, disabledButton } from "../../Forms/EditForms/EditFormsStyles";
import { fundingLabel } from "./CardStyle";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function ArtistCardJSX(props) {
  // const { data, onClick, onDonationClick } = props;
  // const [donatedAmount, setDonatedAmount] = useState(0);
  // let amountDonated = 0;

  
  // useEffect(() => {
  //   return () => {
  //     data && data?.amountRaised.map((item) => {
  //       amountDonated = amountDonated + item.amount;
  //       setDonatedAmount(amountDonated);
  //       // console.log("amount",item.amount);
  //       // console.log("amount1",donatedAmount);
  //     })
  //   }
  // }, [])
  
  // const handleButtonClick = () => {
  //   onClick(data.artistVision);
  // };

  // const handleDonationClick = () => {
  //   onDonationClick(data.fundingTargetAmount);
  // };
  
  const { data, onClick, onDonationClick } = props;
  const [donatedAmount, setDonatedAmount] = useState(0);
  const [isTargetAmountReached, setIsTargetAmountReached] = useState(false);

  // Calculate the total donated amount
  useEffect(() => {
    let totalAmount = 0;
    if (data && data.amountRaised) {
      totalAmount = data.amountRaised.reduce((acc, item) => acc + item.amount, 0);
    }
    setDonatedAmount(totalAmount);
  }, [data]);

  // Check if the target amount is reached
  useEffect(() => {
    if (data) {
      const targetAmount = data.fundingTargetAmount  || 0; // Assuming fundingTargetAmount  holds the target amount
      setIsTargetAmountReached(donatedAmount >= targetAmount);
    }
  }, [data, donatedAmount]);

  const handleButtonClick = () => {
    onClick(data?.patientInfo);
  };

  const handleDonationClick = () => {
    onDonationClick(data?.fundingTargetAmount );
  };
  const url = data?.socialMediaLinks;
  const absoluteUrl = url.includes("http://") || url.includes("https://") ? url : `http://${url}`;  
  return (
    <div>
      <Grid
        container
        style={{
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F2F2F2",
          borderRadius: '10px',
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
        }}
        rowGap={1}
      >
        <Grid item style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Grid>
            <h3>{data?.projectTitle}</h3>
          </Grid>
          <Grid>
            <Link href={absoluteUrl} target="_blank" rel="noopener noreferrer">
             <IconButton><OpenInNewIcon/></IconButton>
            </Link>
          </Grid>
        </Grid>
        {/* <Grid
          item
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        > */}
          <Grid item style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }} columnGap={2}>
            <Typography style={fundingLabel}>Funding Amount</Typography>
            <Typography>&#8377; {data?.fundingTargetAmount}</Typography>
          </Grid>
          <Grid item style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }} columnGap={2}>
          <Typography style={fundingLabel}>Donated Amount </Typography>
         
          <Typography>&#8377; {donatedAmount} </Typography>
           {console.log("donatedAmount",donatedAmount)}
        </Grid>

          <Grid item style={{ display: 'flex', alignItems: 'center', width: '100%', flexDirection: 'column' }} rowGap={1}>
            <Button style={backButtonStyle} fullWidth onClick={handleButtonClick}>Artist Information</Button>
            <Button style={isTargetAmountReached ? disabledButton : updateButtonStyle} fullWidth onClick={handleDonationClick} disabled={isTargetAmountReached}>Donate</Button>
          </Grid>
        {/* </Grid> */}
      </Grid>
    </div>
  );
}
