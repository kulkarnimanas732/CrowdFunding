import { CircularProgress, Grid } from '@mui/material'
import React from 'react'

export default function LoaderJSX() {
    return (
        <Grid container style={{ width: '100%', minHeight: '80dvh', display: 'flex',  }}>
            <Grid item style={{ display: 'flex', flex: 'auto', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress style={{ height: '70px', width: '70px' }}/>
            </Grid>
        </Grid>
    )
}
