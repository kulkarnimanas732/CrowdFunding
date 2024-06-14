import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect ,useState} from 'react'
import { useDispatch } from 'react-redux'
import { getDonationDetailsArtist, getDonationDetailsNgo } from '../../Slice/DashboardSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../../ReducerSetUp/AppContext';
import './donation.css'
import LoaderJSX from '../../../Loader/LoaderJSX';
export default function ArtistDonationHistory() {
    const dispatch = useDispatch();
    const { donationHistory, setDonationHistory } = useAppContext();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true);
        dispatch(getDonationDetailsArtist({ data: id })).then((response) => {
            if (response.payload.status === 200) {
                setDonationHistory(response.payload.data.investorDetails);
                setLoading(false);
            }
        })
    }, [])
    return (

        
        <div className='dashboard-container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80dvh' }}>
            <Box style={{ padding: '20px', width: '90%', minHeight: '80dvh' }}>
                {donationHistory && donationHistory.length > 0 ?
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="left">Email</TableCell>
                                    <TableCell align="left">Donated Amount</TableCell>
                                    
                                </TableRow>
                                
                            </TableHead>
                            <TableBody>
                                {console.log('Donation History', donationHistory)}
                                {donationHistory.slice(0).reverse().map((user) => (
                                    <TableRow key={user._id}>
                                        <TableCell align="left">{user?.investorName}</TableCell>
                                        <TableCell align="left">{user?.investorEmail}</TableCell>
                                        <TableCell align="left">{user?.amount}</TableCell>
                                 
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    :
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                        <h1>Thank You for Your Efforts!</h1>
                        <h2>It looks like you haven't received any donations yet, or we're unable to find any records of received donations at the moment.</h2>
                        <h3>We appreciate your dedication and efforts. When you receive donations, you'll be able to see all the details here, including the date, amount, and donor information.</h3>
                        <Button onClick={()=> navigate('/dashboard')}>Go to dashboard</Button>
                    </div>
                }
            </Box>
        </div>
    )
}
