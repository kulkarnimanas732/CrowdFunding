import React, { useState, useEffect } from "react";
import { Popover, Typography, Box, TextField, Button, Grid, Alert } from "@mui/material";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setErrorAlert, setSuccessAlert } from "../Utility/Slice/alertsSlice";
import { backButtonStyle, updateButtonStyle } from "../Forms/EditForms/EditFormsStyles";

const DonatePopover = ({ data, onClose, category }) => {
    const [amount, setAmount] = useState(null);
    const [totalAmountRaised, setTotalAmountRaised] = useState(0);
    const [targetAmount, setTargetAmount] = useState(0);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success'); // 'success', 'error', 'warning', 'info'
    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
            const totalRaised = data.amountRaised.reduce((sum, donor) => sum + donor.amount, 0);
            setTotalAmountRaised(totalRaised);

            if (category === 'charity') {
                setTargetAmount(data.callToAction || 0);
            } else if (category === 'artist') {
                setTargetAmount(data.fundingTargetAmount || 0);
            }
        }
    }, [data, category]);

    const isTargetAmountReached = totalAmountRaised >= targetAmount;
    const remainingAmount = targetAmount - totalAmountRaised;

    const handleAmountChange = (e) => {
        setAmount(Number(e.target.value));
    };

    const showAlert = (message, severity) => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setAlertVisible(true);
        setTimeout(() => {
            setAlertVisible(false);
        }, 10000); // Alert will be visible for 5 seconds
    };

    const paymentHandler = async (e) => {
        if (amount > remainingAmount) {
            showAlert(`The entered amount exceeds the remaining funding target amount of ₹${remainingAmount}. Please enter a valid amount.`, 'warning');
            return;
        }

        const transactionType = category === 'charity' ? 'charity' : 'artist';

        try {
            const orderRes = await axios.post(
                'http://localhost:5000/api/payment/create-order',
                { amount },
                {
                    headers: {
                        Authorization: localStorage.getItem("access_token") || null,
                        "Content-Type": "application/json",
                    },
                }
            );

            const { order } = orderRes.data;

            const options = {
                key: "rzp_test_4uKRRD8KYBsBwz", // Replace with your Razorpay key
                amount: amount * 100,
                currency: "INR",
                name: "Acme Corp",
                description: "Test Transaction",
                image: "https://example.com/your_logo",
                order_id: order.id,
                handler: async (response) => {
                    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

                    const paymentRes = await axios.post(
                        'http://localhost:5000/api/payment/pay-order',
                        {
                            amount,
                            razorpayPaymentId: razorpay_payment_id,
                            razorpayOrderId: razorpay_order_id,
                            razorpaySignature: razorpay_signature,
                            transactionType,
                            OrderId: data._id,
                        },
                        {
                            headers: {
                                Authorization: localStorage.getItem("access_token") || null,
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    if (paymentRes.data.success) {
                        onClose();
                        showAlert('Payment was successful.', 'success');
                    } else {
                        showAlert('Payment failed. Please try again later.', 'error');
                    }
                },
                prefill: {
                    name: "Web Dev Matrix",
                    email: "webdevmatrix@example.com",
                    contact: "9000000000",
                },
                notes: {
                    address: "Razorpay Corporate Office",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.on("payment.failed", (response) => {
                showAlert(`Payment failed: ${response.error.reason}`, 'error');
            });

            rzp1.open();
        } catch (error) {
            showAlert('Error creating order. Please try again later.', 'error');
        }
    };

    return (
        <>
            {data && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: '999',
                    }}
                    onClick={onClose}
                ></div>
            )}
            <Popover
                open={Boolean(data)}
                anchorReference="none"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onClose={onClose}
            >
                <Box
                    style={{
                        padding: '16px',
                        backgroundColor: '#ffffff',
                        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                        borderRadius: '4px',
                        position: 'relative',
                        width: '300px' // Adjust width as needed
                    }}
                >
                    <Grid container style={{ display: 'flex', flexDirection: 'column' }} rowGap={2}>
                        <Grid item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography style={{ color: '#02A95C', fontWeight: '600' }}>Uniting Hearts, Creating Change</Typography>
                        </Grid>
                        <Grid item>
                            <Typography style={{ padding: '4px 4px 4px 8px', fontSize: '14px' }}>
                                Donation
                            </Typography>
                            <Typography style={{ backgroundColor: '#F2F2F2', color: '#02A95C', padding: '4px 4px 4px 8px', borderRadius: '10px' }}>
                                {category === 'artist' && (data?.fundingTargetAmount ? data?.fundingTargetAmount : '00')}
                                {category === 'charity' && (data?.callToAction ? data?.callToAction : '00')}
                            </Typography>
                        </Grid>
                        {alertVisible && (
                            <Grid item>
                                <Alert severity={alertSeverity} onClose={() => setAlertVisible(false)}>
                                    {alertMessage}
                                </Alert>
                            </Grid>
                        )}
                        <Grid item rowGap={1} style={{ display: 'flex', colGap: '5px', flexDirection: 'column' }}>
                            <TextField
                                placeholder="Enter Amount for donation"
                                label="Amount"
                                value={amount}
                                onChange={handleAmountChange}
                                fullWidth
                                disabled={isTargetAmountReached}
                            />
                            <Button
                                style={updateButtonStyle}
                                fullWidth
                                onClick={paymentHandler}
                                disabled={isTargetAmountReached}
                            >
                                Donate
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container style={{ marginTop: '5px' }}>
                        <Button style={backButtonStyle} fullWidth onClick={onClose}>Close</Button>
                    </Grid>
                </Box>
            </Popover>
        </>
    );
};

export default DonatePopover;
