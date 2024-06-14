import { Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { delteIcon, editIcon, pageTitle, tableHeadStyle } from './CampaignDetailsStyles';
import { deleteNGO, isLoading, ngoCampaignDetails } from '../Slice/DashboardSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoaderJSX from '../../Loader/LoaderJSX';
import { setSuccessAlert } from '../../Utility/Slice/alertsSlice';


export default function NgoCampaignDetailsJSX(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const ngoDetails = useSelector(ngoCampaignDetails);
    const loading = useSelector(isLoading);

    const handleNGODelete = (data) => {
        dispatch(deleteNGO({ data: data })).then((response) => { if (response.payload.status === 200) { navigate('/') } })
    }

    useEffect(()=>{
        if(ngoDetails[0].amountRaised.reduce((acc, item) => acc + item.amount, 0) === ngoDetails[0].callToAction){
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
                            <h3 style={pageTitle} >NGO Campaign Details</h3>
                            <Grid>
                                <Button onClick={() => navigate(`/dashboard/donationhistory/${ngoDetails[0]?._id}`)}>
                                    View Donation History
                                </Button>
                                <IconButton aria-label="delete">
                                    <EditIcon style={editIcon} onClick={() => navigate('/dashboard/editngodetails')} />
                                </IconButton>
                                <IconButton aria-label="delete">
                                    <DeleteIcon style={delteIcon} onClick={() => handleNGODelete(ngoDetails[0]?._id)} />
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
                                            Organization Name
                                        </TableCell>
                                        <TableCell align="left">{ngoDetails[0]?.organizationName}</TableCell>
                                    </TableRow>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell style={tableHeadStyle} component="th" scope="row">
                                            Patient
                                        </TableCell>
                                        <TableCell align="left">{ngoDetails[0]?.patientName}</TableCell>
                                    </TableRow>
                                    <TableRow

                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell style={tableHeadStyle} component="th" scope="row">
                                            Hospital
                                        </TableCell>
                                        <TableCell align="left">{ngoDetails[0]?.hospitalName}</TableCell>
                                    </TableRow>
                                    <TableRow

                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell style={tableHeadStyle} component="th" scope="row">
                                            Patient Information
                                        </TableCell>
                                        <TableCell align="left">{ngoDetails[0]?.patientInfo}</TableCell>
                                    </TableRow>
                                    <TableRow

                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell style={tableHeadStyle} component="th" scope="row">
                                            Social Media Links
                                        </TableCell>
                                        <TableCell align="left">{ngoDetails[0]?.socialMediaLinks}</TableCell>
                                    </TableRow>
                                    <TableRow

                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell style={tableHeadStyle} component="th" scope="row">
                                            Solution
                                        </TableCell>
                                        <TableCell align="left">{ngoDetails[0]?.solution}</TableCell>
                                    </TableRow>
                                    <TableRow

                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell style={tableHeadStyle} component="th" scope="row">
                                            Bank Name
                                        </TableCell>
                                        <TableCell align="left">{ngoDetails[0]?.bankName}</TableCell>
                                    </TableRow>
                                    <TableRow

                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell style={tableHeadStyle} component="th" scope="row">
                                            Account Number
                                        </TableCell>
                                        <TableCell align="left">{ngoDetails[0]?.accountNumber}</TableCell>
                                    </TableRow>
                                    <TableRow

                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell style={tableHeadStyle} component="th" scope="row">
                                            IFSC Code
                                        </TableCell>
                                        <TableCell align="left">{ngoDetails[0]?.ifscCode}</TableCell>
                                    </TableRow>
                                    <TableRow

                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell style={tableHeadStyle} component="th" scope="row">
                                            Funding Amount
                                        </TableCell>
                                        <TableCell align="left">{ngoDetails[0]?.callToAction}</TableCell>
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
