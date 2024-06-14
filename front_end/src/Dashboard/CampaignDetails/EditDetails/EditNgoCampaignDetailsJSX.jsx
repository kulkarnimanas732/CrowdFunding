import React from 'react'
import { Grid } from '@mui/material'
import { useSelector } from 'react-redux';
import { ngoCampaignDetails } from '../../Slice/DashboardSlice';
import EditNgoForm from '../../../Forms/EditForms/EditNgoForm';

export default function EditNgoCampaignDetailsJSX() {
    const ngoDetails = useSelector(ngoCampaignDetails)
    return (
        <Grid container style={{ width: '100%', minHeight: '80dvh', padding: '20px' }}>
            <EditNgoForm ngoCampaignDetails={ngoDetails} updateButton={true} />
        </Grid>
    )
}
