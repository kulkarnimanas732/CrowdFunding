import React from 'react'
import { Grid } from '@mui/material'
import { useSelector } from 'react-redux';
import { artistCampaignDetails } from '../../Slice/DashboardSlice';
import EditArtistForm from '../../../Forms/EditForms/EditArtistForm';

export default function EditArtistCampaignDetails() {
    const artistDetails = useSelector(artistCampaignDetails)
    return (
        <Grid container style={{ width: '100%', minHeight: '80dvh', padding: '20px' }}>
            <EditArtistForm artistCampaignDetails={artistDetails} updateButton={true} />
        </Grid>
    )
}
