import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../ReducerSetUp/AppContext";
import { useDispatch, useSelector } from "react-redux";
import NgoCampaignDetailsJSX from "./CampaignDetails/NgoCampaignDetailsJSX";
import ArtistCampaignDetailsJSX from "./CampaignDetails/ArtistCampaignDetailsJSX";
import { artistCampaignDetails, getArtist, getNGO, isLoading, ngoCampaignDetails} from "./Slice/DashboardSlice";
import LoaderJSX from "../Loader/LoaderJSX";

export default function HomeJSX() {

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      role === 'charity' && dispatch(getNGO());
      role === 'artist' && dispatch(getArtist());
    }
  }, [])

  const { isAuthenticatedUser, role } = useAppContext();

  const artistDetails = useSelector(artistCampaignDetails);
  const ngoDetails = useSelector(ngoCampaignDetails);
  // const loading = useSelector(isLoading);

  const isCampaignCreated = ((role === "charity" && ngoDetails && ngoDetails.length > 0)  || (role === "artist" && artistDetails && artistDetails.length > 0));

  const buttonStyle = {
    backgroundColor: 'rgb(2, 169, 92)',
    color: 'rgb(255, 255, 255)',
    textDecoration: 'none',
    borderRadius: '10px',
    padding: '10px',
  }

  return (
    <>
      {/* {loading ? (
        <LoaderJSX />
      ) : */}
      <React.Fragment>
        {(isAuthenticatedUser && isCampaignCreated)
          ?
          <>
            {role === "charity" && <NgoCampaignDetailsJSX ngoDetails={ngoDetails} />}
          
            {role === "artist" && <ArtistCampaignDetailsJSX artistCampaignDetails={artistDetails} />}
          </>
          :
          <Grid style={{ display: "flex", alignItems: "center", gap: "1rem", height: '80dvh', padding: '0rem 5rem 0rem 5rem' }}>
            <Grid>
              <h1 style={{ color: '#006A4E' }}>
                CrowdsClub is a crowdfunding platform that empowers charities and artists to bring their innovative ideas to life and
                create positive change.
              </h1>
              <h2 style={{ color: '#006A4E' }}>
                We provide the tools and a global community to enable charities to drive awareness and funding for their causes, while also allowing artists to find backers for creative projects such as films, music, and literature.
              </h2>
              <h3 style={{ color: '#006A4E' }}>
                With CrowdsClub, you can be a part of the movement to unleash
                world-changing ideas and make a meaningful impact by supporting the
                "people who are crazy enough to think they can change the world."
              </h3>
              {!isAuthenticatedUser && <Link to="/signup" style={buttonStyle}>Register</Link>}
              {isAuthenticatedUser && <Link to="/dashboard" style={buttonStyle}>Dashboard</Link>}
            </Grid>
          </Grid>}
      </React.Fragment>
    </>
  );
}
