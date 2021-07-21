import * as React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import PricingTable from './PricingTable';
import JSONEditorModal from './JSONEditor';


export default function Layout() {
    return (
        <Container maxWidth="xxl" sx={{ height: '100vh' }} disableGutters>
            <Grid container spacing={2}
                justifyContent="center"
                alignItems="center">
                <Grid item xs={12}>
                    <Box sx={{ bgcolor: 'primary.dark', color: 'primary.contrastText', p: 2 }}>
                        <Typography variant="h3" gutterBottom component="span">
                            Choose a plan
                        </Typography>
                    </Box>
                </Grid>
                <Grid item sm={12} md={8} sx={{ margin: 3 }}>
                    <PricingTable />
                </Grid>
                <Grid item xs={12}>
                    <JSONEditorModal />
                </Grid>
            </Grid>
        </Container>
    );
}