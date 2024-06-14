import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSuccessAlert, setErrorAlert, setInfoAlert, closeAlert, selectSuccessAlerts, selectErrorAlerts, selectInfoAlerts } from './Slice/alertsSlice';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { selectAlerts } from './Slice/alertsSlice';

export default function AlertComponent() {
    const dispatch = useDispatch();
    
    const success = useSelector(selectSuccessAlerts);
    const error = useSelector(selectErrorAlerts);
    const info = useSelector(selectInfoAlerts);

    const handleClose = () => {
        dispatch(closeAlert());
    };

    let checkError = success || error || info;

    return (
     checkError && <>
            <Box sx={{ width: '100%' }}>
                <Collapse in={success.open}>
                    <Alert
                        severity="success"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={handleClose}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        {success.message}
                    </Alert>
                </Collapse>

                <Collapse in={error.open}>
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={handleClose}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        {error.message}
                    </Alert>
                </Collapse>

                <Collapse in={info.open}>
                    <Alert
                        severity="info"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={handleClose}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        {info.message}
                    </Alert>
                </Collapse>
            </Box>
        </>
    );
}
