import { Button, Grid, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppContext } from "../ReducerSetUp/AppContext";
import NgoCardJSX from "./Card/NgoCardJSX";
import { allArtists, allNgos, fetchAllArtists, fetchAllNgos, isLoading } from "./Slice/DashboardSlice";
import ArtistCardJSX from "./Card/ArtistCardJSX";
import BasicPopover from "../Popover/PopoverJSX";
import DonatePopover from "../Popover/DonatePopOverJSX";
import InvestorBg from "../assets/Investor.jpg"
import LoaderJSX from "../Loader/LoaderJSX";
 import { useNavigate } from 'react-router-dom';
import { investorDetails } from "./Slice/DashboardSlice";
import { getInvestorDonations } from './Slice/DashboardSlice';
// Inside your component


export default function InvestorDashboardJSX() {
  const navigate = useNavigate();

  const { role, anchorEl, selectedCard, setSelectedCard } = useAppContext();
  const dispatch = useDispatch();
  const allNgoDetails = useSelector(allNgos);
  const allArtistsDetails = useSelector(allArtists);
  const loading = useSelector(isLoading);

  const [ngoSelected, setNgoSelected] = useState(false);
  const [artistSelected, setArtistSelected] = useState(false);
  const [startupSelected, setStartupSelected] = useState(false);

  const [donationClicked, setDonationClicked] = useState(null);
  const [donationClickedArtist, setDonationClickedArtist] = useState(null);
  const [selectedArtistCard, setSelectedArtistCard] = useState(null);
  // const investorDetails = useSelector();
  const investorDetailsData = useSelector(investorDetails);

  useEffect(() => {
    return () => {
      dispatch(fetchAllNgos()).then((response) => {
        if (response.payload.status === 200) {
          setNgoSelected(true);
          setArtistSelected(false);
          setStartupSelected(false);
        }
      })
    }
  }, [])
 
 
  const handleNgoCardClick = (item) => {
    setSelectedCard(item);
  };

  // Function to handle click on ArtistCard
  const handleArtistCardClick = (item) => {
    setSelectedArtistCard(item);
  };

  const handleDonationClick = (item) => {
    setDonationClicked(item);
  }

  const handleDonationClickArtist = (item) => {
    setDonationClickedArtist(item);
  }


  return (
    <>
      {loading ? (
        <LoaderJSX />
      ) :
        (<Grid style={{ minHeight: "100dvh", padding: '20px' }}>
          <Grid>
            <div
              style={{ height: "300px", width: "100%", backgroundColor: "pink", position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <img src={InvestorBg} alt="Investor Background" style={{ height: "300px", width: "100%", backgroundColor: "pink" }} />

              <h1 style={{ position: 'absolute', color: '#FFFFFF' }}>Join us support artists and charities by investing in our project.<br />Together, we can make a difference in people's lives.</h1>
            </div>
          </Grid>
          <Grid>
            <Grid>
              <Grid item style={{ padding: "10px" }}>
                <Button disabled>Categories</Button>
                <Button
                  style={{ color: ngoSelected && '#02A95C' }}
                  onClick={() => {
                    dispatch(fetchAllNgos()).then((respone) => {
                      if (respone.payload.status === 200) {
                        setArtistSelected(false);
                        setStartupSelected(false);
                        setNgoSelected(true);
                      }
                    })
                  }}>NGO</Button>
                <Button
                  style={{ color: artistSelected && '#02A95C' }}
                  onClick={() => {
                    dispatch(fetchAllArtists()).then((respone) => {
                      if (respone.payload.status === 200) {
                        setNgoSelected(false);
                        setStartupSelected(false);
                        setArtistSelected(true);
                      }
                    })
                  }}>Artist</Button>
             
            <Button onClick={() => navigate(`/dashboard/donor-history/${localStorage.getItem('userId')}`)}>Donated History</Button>
                        
              </Grid>
            </Grid>
            <Grid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} container rowGap={2} columnGap={2}>

              {/* {console.log("All Details Ngos", allNgoDetails)} */}
              {ngoSelected && allNgoDetails.map((item) => {
                return <NgoCardJSX key={item?.id} data={item} onClick={() => handleNgoCardClick(item)} onDonationClick={() => handleDonationClick(item)} />
              })}

              {artistSelected && allArtistsDetails.map((item) => {
                return <ArtistCardJSX key={item?.id} data={item} onClick={() => handleArtistCardClick(item)} onDonationClick={() => handleDonationClickArtist(item)} />
              })}
            </Grid>
          </Grid>
          {selectedCard && <BasicPopover data={selectedCard} onClose={() => setSelectedCard(null)} category="charity" />}

          {selectedArtistCard && <BasicPopover data={selectedArtistCard} onClose={() => setSelectedArtistCard(null)} category="artist" />}

          {donationClicked && <DonatePopover data={donationClicked} onClose={() => setDonationClicked(null)} category="charity" />}

          {donationClickedArtist && <DonatePopover data={donationClickedArtist} onClose={() => setDonationClickedArtist(null)} category="artist" />}
        </Grid>
        )}
    </>
  );
}
