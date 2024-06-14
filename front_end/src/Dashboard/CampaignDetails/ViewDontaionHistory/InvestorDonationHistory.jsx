
import { Button, CircularProgress, Typography } from '@mui/material';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInvestorDonations, dashboardSlice } from '../../Slice/DashboardSlice';
import { useNavigate, useParams } from 'react-router-dom';
import './donation.css'
import LoaderJSX from '../../../Loader/LoaderJSX';
const InvestorDonationHistory = ({ }) => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  // const { getInvestorDonations } = dashboardSlice.actions;
  // const investorDonations = useSelector((state) => state.dashboard.investorDonations);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [donationHistory, setDonationHistory] = useState([]);

  useEffect(() => {
    setLoading(true);
    dispatch(getInvestorDonations({ data: id })).then((response) => {
      if (response.payload.success)
        setDonationHistory(response.payload.enrichedOrders);
      setLoading(false);
    });
  }, [])


  //   useEffect(() => {
  //     dispatch(getInvestorDonations({ data: { id: investorId } }))
  //       .then((response) => {
  //         if (response.payload.success) {
  //           setDonationHistory(response.payload.enrichedOrders);
  //         }
  //         })
  //   }, []);

  //   if (loading) {
  //     return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}><CircularProgress /></div>;
  //   }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minHeight: '80vh' }}>
        <Typography variant="h5" color="error">{error}</Typography>
        <Button onClick={() => Navigate('/dashboard')}>Go to dashboard</Button>
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <LoaderJSX />
      ) : (
        <div className='dashboard-container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
          <Box style={{ padding: '20px', width: '90%', minHeight: '80vh' }}>
            {donationHistory && donationHistory.length > 0 ? (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Transaction ID</TableCell>
                      <TableCell align="left">Donated Amount</TableCell>
                      <TableCell align="left">Category</TableCell>
                      <TableCell align="left">Campaign</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {donationHistory.slice(0).reverse().map((order) => (
                      <TableRow key={order.orderId}>
                        <TableCell align="left">{order.transactionId}</TableCell>
                        <TableCell align="left">{order.amount}</TableCell>
                        <TableCell align="left">{order.transactionType}</TableCell>
                        <TableCell align="left">
                          {order.projectDetails.projectTitle ? (
                            <div>
                              <p>{order.projectDetails.projectTitle}</p>
                              {/* <p><strong>Description:</strong> {order.projectDetails.projectOverview}</p>
                          <p><strong>Target Amount:</strong> {order.projectDetails.fundingTargetAmount}</p> */}
                            </div>
                          ) : (
                            <p>Project details not available</p>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <h1>Thank You for Your Efforts!</h1>
                <h2>It looks like you haven't received any donations yet, or we're unable to find any records of received donations at the moment.</h2>
                <h3>We appreciate your dedication and efforts. When you receive donations, you'll be able to see all the details here, including the date, amount, and donor information.</h3>
                <Button onClick={() => Navigate('/dashboard')}>Go to dashboard</Button>
              </div>
            )}
          </Box>
        </div>
      )}
    </>
  );
}
export default InvestorDonationHistory;