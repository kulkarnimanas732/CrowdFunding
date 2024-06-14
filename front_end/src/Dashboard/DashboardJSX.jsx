import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArtistFormJSX from "../Forms/ArtistFormJSX";
import CampaignCreation from "../assets/CampaignCreation.png";
import { artistCampaignDetails, artistDetails, campaignCreationArtist, campaignCreationNGO, getArtist, getNGO, isLoading, ngoCampaignDetails, ngoDetails} from "./Slice/DashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NgoFormJSX from "../Forms/NgoFormJSX";
import { useAppContext } from "../ReducerSetUp/AppContext";
import LoaderJSX from "../Loader/LoaderJSX";
import { backButtonStyle, updateButtonStyle } from "../Forms/EditForms/EditFormsStyles";
import { pageTitle } from "./CampaignDetails/CampaignDetailsStyles";
import NgoCampaignDetailsJSX from "./CampaignDetails/NgoCampaignDetailsJSX";
import ArtistCampaignDetailsJSX from "./CampaignDetails/ArtistCampaignDetailsJSX";
import { closeAlert, setInfoAlert } from "../Utility/Slice/alertsSlice";

export default function DashboardJSX() {
  const [campaignPage, setCampaignCreation] = React.useState(false);
  const role = localStorage.getItem('role');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const artistDetails = useSelector(artistCampaignDetails);
  const ngoDetails = useSelector(ngoCampaignDetails);
 

  const {
    organizationName,
    setOrganizationName,
    patientName,
    setPatientName,
    hospitalName,
    setHospitalName,
    patientInfo,
    setPatientInfo,
    patientImages,
    setPatientImages,
    solution,
    setSolution,
    socialMediaLinks,
    setSocialMediaLinks,
    fundingTargetAmount,
    setFundingTargetAmount,
    artistName,
    setArtistName,
    projectTitle,
    setProjectTitle,
    artistDescription,
    setArtistDescription,
    phoneNumber,
    setPhoneNumber,
    artistVision,
    setArtistVision,
    projectOverview,
    setProjectOverview,
    amountRaised,
    setamountRaised,
    accountNumber, setAccountNumber, bankName, setBankName, ifscCode, setIfscCode
  } = useAppContext();

  // const ngoDetails = useSelector( state=> state.dasboardSlice.ngoDetails);
  const loading = useSelector(isLoading);

  useEffect(() => {
    return () => {
      role === 'charity' && dispatch(getNGO());
      role === 'artist' && dispatch(getArtist());
    }
  }, [])


  const artistData = {
    artistName: artistName,
    projectTitle: projectTitle,
    artistDescription: artistDescription,
    phoneNumber: phoneNumber,
    socialMediaLinks: socialMediaLinks,
    artistVision: artistVision,
    projectOverview: projectOverview,
    accountNumber: accountNumber,
    bankName: bankName,
    ifscCode: ifscCode,
    fundingTargetAmount: fundingTargetAmount
  }

  const ngoData = {
    organizationName: organizationName,
    patientName: patientName,
    hospitalName: hospitalName,
    patientInfo: patientInfo,
    patientImages: patientImages,
    socialMediaLinks: socialMediaLinks,
    solution: solution,
    callToAction: fundingTargetAmount,
    accountNumber: accountNumber,
    bankName: bankName,
    ifscCode: ifscCode,
    amountRaised: amountRaised
  }


  return (
    <>
      {loading ? (
        <LoaderJSX />
      ) : (
        ((role === "charity" && ngoDetails && ngoDetails.length > 0) || (role === "artist" && artistDetails && artistDetails.length > 0))
          ?
          <>
            <Grid container>
              {role === "charity" && <NgoCampaignDetailsJSX ngoDetails={ngoDetails} />}
              {role === "artist" && <ArtistCampaignDetailsJSX artistCampaignDetails={artistDetails} />}
            </Grid>
          </>
          :
          <Grid
            style={{
              display: "flex",
              justifyContent: "center",
              minHeight: '80dvh',
              padding: '0px 100px 0px 100px',
              alignItems: 'center'
            }}
            container
            lg={12}
          >
            <Box style={{ height: '70dvh', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', width: '100%' }}>
              <Grid
                item
                lg={6}
              >
                <img
                  src={CampaignCreation}
                  alt="Campaign Creation"
                  style={{ height: "450px", width: "500px" }}
                ></img>
              </Grid>
              <Grid
                item
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 'auto',
                  padding: '0px 10px 0px 10px '
                }}
                lg={6}
              >
                <h2 style={pageTitle}>Campaign Creation</h2>
                {!campaignPage ? (
                  <Grid
                    item
                    style={{ textAlign: "left", lineHeight: "2rem", width: "350px" }}
                  >
                    <h3>Bring Your Innovative Ideas to Life.</h3>
                    <Typography>
                      At Crowdsclub, we believe bold ideas have the power to reshape our
                      world.Whether you're an inventor, entrepreneur, artist or
                      changemaker, we provide the tools and community to turn your
                      vision into reality through crowdfunding. Start Your Campaign
                      Ready to launch your big idea? Our straightforward process
                      empowers anyone to set up a professional crowdfunding campaign in
                      just minutes. Just set your goal, create your page, and hit go -
                      our tools make marketing and updates a breeze.
                    </Typography>
                  </Grid>
                ) : (
                  <Grid style={{ overflowY: 'auto', height: '50dvh' }} container>
                    {role === 'artist' && <ArtistFormJSX />}

                    {role === 'charity' && <NgoFormJSX />}

                  </Grid>
                )}
                <Grid
                  item
                  style={{
                    display: "flex",
                    justifyContent: campaignPage ? "space-between" : 'center',
                    alignItems: "center",
                    width: '100%',
                    marginTop: '15px'
                  }}
                >
                  {campaignPage && (
                    <Button
                      onClick={() => {
                        setCampaignCreation(false);
                      }}
                      style={backButtonStyle}
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      setCampaignCreation(true);
                      if (campaignPage && role === 'artist') {
                        if (artistName !== null && projectTitle !== null && artistDescription !== null && phoneNumber !== null && socialMediaLinks !== null && artistVision !== null && projectOverview !== null && accountNumber !== null && bankName !== null && ifscCode !== null && fundingTargetAmount !== null) {
                          dispatch(campaignCreationArtist({ data: artistData })).then((response) => {
                            navigate('/')
                          });
                        } else {
                          dispatch(setInfoAlert('Fill the data and then proceed further'));
                          setTimeout(() => {
                            dispatch(closeAlert());
                          }, 3000);
                        }
                      }

                      if (organizationName !== null && patientName !== null && hospitalName !== null && patientInfo !== null && patientImages !== null && socialMediaLinks !== null && solution !== null && fundingTargetAmount !== null && accountNumber !== null && bankName !== null && ifscCode !== null && amountRaised !== null) {
                        campaignPage && role === 'charity' && dispatch(campaignCreationNGO({ data: ngoData })).then((response) => {
                          navigate('/')
                        });
                      } else {
                        dispatch(setInfoAlert('Fill the data and then proceed further'));
                        setTimeout(() => {
                          dispatch(closeAlert());
                        }, 3000);
                      }


                    }}
                    style={updateButtonStyle}
                  >
                    Campaign Creation
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
      )}
    </>

  );
}
