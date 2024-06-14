import React from "react";
import { Popover, Typography, Box, Grid, Button } from "@mui/material";
import { backButtonStyle } from "../Forms/EditForms/EditFormsStyles";


const BasicPopover = ({ data, onClose, category }) => {

    return (
        <>
            {data && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: '999'
                }} onClick={onClose}></div>
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
                <Box style={{
                    padding: '16px',
                    backgroundColor: '#ffffff',
                    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                    borderRadius: '4px',
                    position: 'relative',
                    minWidth: '350px',
                    maxWidth: '500px'
                }}>
                    {category === 'charity' ?
                        <Grid container style={{ display: 'flex', flexDirection: 'column' }} rowGap={2}>
                            <Grid item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography style={{ color: '#02A95C', fontWeight: '600' }}>{data?.organizationName}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography style={{ padding: '4px 4px 4px 8px', fontSize: '14px' }}>
                                    Name
                                </Typography>
                                <Typography style={{ backgroundColor: '#F2F2F2', color: '#02A95C', padding: '4px 4px 4px 8px', borderRadius: '10px' }}>
                                    {data?.patientName}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography style={{ padding: '4px 4px 4px 8px', fontSize: '14px' }}>
                                    Hospital Name
                                </Typography>
                                <Typography style={{ backgroundColor: '#F2F2F2', color: '#02A95C', padding: '4px 4px 4px 8px', borderRadius: '10px' }}>
                                    {data?.hospitalName}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography style={{ padding: '4px 4px 4px 8px', fontSize: '14px' }}>
                                    Patient Information
                                </Typography>
                                <Typography style={{ backgroundColor: '#F2F2F2', color: '#02A95C', padding: '4px 4px 4px 8px', borderRadius: '10px', maxHeight: '100px', overflowY: 'auto' }}>
                                    {data?.patientInfo}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography style={{ padding: '4px 4px 4px 8px', fontSize: '14px' }}>
                                    Solution
                                </Typography>
                                <Typography style={{ backgroundColor: '#F2F2F2', color: '#02A95C', padding: '4px 4px 4px 8px', borderRadius: '10px', maxHeight: '100px', overflowY: 'auto' }}>
                                    {data?.solution}
                                </Typography>
                            </Grid>
                        </Grid>
                        :
                        <Grid container style={{ display: 'flex', flexDirection: 'column' }} rowGap={2}>
                            <Grid item>
                                <Typography style={{ padding: '4px 4px 4px 8px', fontSize: '14px' }}>
                                    Artist Name
                                </Typography>
                                <Typography style={{ backgroundColor: '#F2F2F2', color: '#02A95C', padding: '4px 4px 4px 8px', borderRadius: '10px' }}>
                                    {data?.artistName}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography style={{ padding: '4px 4px 4px 8px', fontSize: '14px' }}>
                                    Artist Description
                                </Typography>
                                <Typography style={{ backgroundColor: '#F2F2F2', color: '#02A95C', padding: '4px 4px 4px 8px', borderRadius: '10px', maxHeight: '100px', overflowY: 'auto' }}>
                                    {data?.artistDescription}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography style={{ padding: '4px 4px 4px 8px', fontSize: '14px' }}>
                                    Artist Vision
                                </Typography>
                                <Typography style={{ backgroundColor: '#F2F2F2', color: '#02A95C', padding: '4px 4px 4px 8px', borderRadius: '10px', maxHeight: '100px', overflowY: 'auto' }}>
                                    {data?.artistVision}
                                </Typography>
                            </Grid>
                        </Grid>
                    }
                    <Grid container style={{ padding: '10px' }}>
                        <Button style={backButtonStyle} fullWidth onClick={onClose}>Close</Button>
                    </Grid>
                </Box>
            </Popover>
        </>
    );
};

export default BasicPopover;
