import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../ReducerSetUp/AppContext";
import BasicPopover from "../../Popover/PopoverJSX";
import { backButtonStyle, disabledButton, updateButtonStyle } from "../../Forms/EditForms/EditFormsStyles";
import { fundingLabel } from "./CardStyle";
import DonatePopover from "../../Popover/DonatePopOverJSX";

export default function NgoCardJSX(props) {

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
      const targetAmount = data.callToAction || 0; // Assuming callToAction holds the target amount
      setIsTargetAmountReached(donatedAmount >= targetAmount);
    }
  }, [data, donatedAmount]);

  const handleButtonClick = () => {
    onClick(data?.patientInfo);
  };

  const handleDonationClick = () => {
    onDonationClick(data?.callToAction);
  };
  return (
    <div>
      <Grid container style={{ padding: "10px", display:'flex', flexDirection:'column', backgroundColor:"#F2F2F2", borderRadius:'10px', boxShadow:'rgba(0, 0, 0, 0.35) 0px 5px 15px' }} rowGap={1}>
        <Grid item>
          <div style={{height:'100px', backgroundColor:'pink'}}>
            <img src={data?.patientImages} style={{width:' -webkit-fill-available', height: '100px'}}></img>
          </div>
        </Grid>
        <Grid item>
          <h3>{data.organizationName}</h3>
        </Grid>
        <Grid item style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }} columnGap={2}>
          <Typography style={fundingLabel}>Funding Amount</Typography>
          <Typography>&#8377; {data?.callToAction ? data?.callToAction : "00.00"}</Typography>
        </Grid>
        <Grid item style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }} columnGap={2}>
          <Typography style={fundingLabel}>Donated Amount </Typography>
         
          <Typography>&#8377; {donatedAmount} </Typography>
           {console.log("donatedAmount",donatedAmount)}
        </Grid>

        <Grid item style={{ display: 'flex', alignItems: 'center', width: '100%', flexDirection:'column' }} rowGap={1}>
          <Button style={backButtonStyle} fullWidth onClick={handleButtonClick}>Patient Information</Button>
          <Button style={isTargetAmountReached ? disabledButton : updateButtonStyle} fullWidth onClick={handleDonationClick} disabled={isTargetAmountReached}>Donate</Button>
        </Grid>
      </Grid>
    </div>
  );
}
