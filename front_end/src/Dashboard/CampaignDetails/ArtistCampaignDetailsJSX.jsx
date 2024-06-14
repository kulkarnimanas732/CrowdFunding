import { Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { delteIcon, editIcon, pageTitle, tableHeadStyle } from './CampaignDetailsStyles';
import { useDispatch, useSelector } from 'react-redux';
import { artistCampaignDetails, deleteArtist, isLoading } from '../Slice/DashboardSlice';
import LoaderJSX from '../../Loader/LoaderJSX';
import AlertComponent from '../../Utility/AlertComponent';
import { selectAlerts, selectErrorAlerts, selectInfoAlerts, selectSuccessAlerts, setSuccessAlert } from '../../Utility/Slice/alertsSlice';
import { useAppContext } from '../../ReducerSetUp/AppContext';

export default function ArtistCampaignDetailsJSX(props) {
    // const { artistCampaignDetails } = props;

    const artistDetails = useSelector(artistCampaignDetails);
    const loading = useSelector(isLoading);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleArtistDelete = (data) => {
        dispatch(deleteArtist({ data: data })).then((response) => { if (response.payload.status === 200) { navigate('/') } })
    }

    useEffect(()=>{
        if(artistDetails[0].amountRaised.reduce((acc, item) => acc + item.amount, 0) === artistDetails[0].fundingTargetAmount){
            dispatch(setSuccessAlert('Your donation is been completed for this campaign.'));
        }
    },[])

    return (
        <>
            {loading ? (
                <LoaderJSX />
            ) :
                (<Grid container style={{ width: '100%', minHeight: '80dvh' }}>
                    <Grid item style={{ display: 'flex', flex: 'auto', flexDirection: 'column', padding: '20px' }}>
                        <Grid item style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <h3 style={pageTitle}>Artist Campaign Details</h3>
                            <Grid>
                                <Button onClick={() => navigate(`/dashboard/donation-history/${artistDetails[0]?._id}`)}>
                                    View Donation History
                                </Button>
                                <IconButton aria-label="delete">
                                    <EditIcon style={editIcon} onClick={() => navigate('/dashboard/editartistdetails')} />
                                </IconButton>
                                <IconButton aria-label="delete">
                                    <DeleteIcon style={delteIcon} onClick={() => handleArtistDelete(artistDetails[0]?._id)} />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableBody>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell style={tableHeadStyle} component="th" scope="row">
                                            Artist Name
                                        </TableCell>
                                        <TableCell align="left">{artistDetails[0]?.artistName}</TableCell>
                                    </TableRow>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell style={tableHeadStyle} component="th" scope="row">
                                            Project Title
                                        </TableCell>
                                        <TableCell align="left">{artistDetails[0]?.projectTitle}</TableCell>
                                    </TableRow>
                                    <TableRow

                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell style={tableHeadStyle} component="th" scope="row">
                                            Artist Description
                                        </TableCell>
                                        <TableCell align="left">{artistDetails[0]?.artistDescription}</TableCell>
                                    </TableRow>
                                    <TableRow

                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell style={tableHeadStyle} component="th" scope="row">
                                            Phone Number
                                        </TableCell>
                                        <TableCell align="left">{artistDetails[0]?.phoneNumber}</TableCell>
                                    </TableRow>
                                    <TableRow

                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell style={tableHeadStyle} component="th" scope="row">
                                            Social Media Links
                                        </TableCell>
                                        <TableCell align="left">{artistDetails[0]?.socialMediaLinks}</TableCell>
                                    </TableRow>
                                    <TableRow

                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell style={tableHeadStyle} component="th" scope="row">
                                            Artist Vision
                                        </TableCell>
                                        <TableCell align="left">{artistDetails[0]?.artistVision}</TableCell>
                                    </TableRow>
                                    <TableRow

                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell style={tableHeadStyle} component="th" scope="row">
                                            Project Overview
                                        </TableCell>
                                        <TableCell align="left">{artistDetails[0]?.projectOverview}</TableCell>
                                    </TableRow>
                                    <TableRow

                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell style={tableHeadStyle} component="th" scope="row">
                                            Bank Name
                                        </TableCell>
                                        <TableCell align="left">{artistDetails[0]?.bankName}</TableCell>
                                    </TableRow>
                                    <TableRow

                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell style={tableHeadStyle} component="th" scope="row">
                                            Account Number
                                        </TableCell>
                                        <TableCell align="left">{artistDetails[0]?.accountNumber}</TableCell>
                                    </TableRow>
                                    <TableRow

                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell style={tableHeadStyle} component="th" scope="row">
                                            IFSC Code
                                        </TableCell>
                                        <TableCell align="left">{artistDetails[0]?.ifscCode}</TableCell>
                                    </TableRow>
                                    <TableRow

                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell style={tableHeadStyle} component="th" scope="row">
                                            Funding Amount
                                        </TableCell>
                                        <TableCell align="left">{artistDetails[0]?.fundingTargetAmount}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                )}
        </>
    )
}
