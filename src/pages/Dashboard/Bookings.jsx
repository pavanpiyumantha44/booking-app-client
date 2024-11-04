import { Box, Breadcrumbs, Stack, Typography } from '@mui/material';
import Grid from "@mui/material/Grid2";
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import Progress from '../../components/Progress';



const breadcrumbs = [
  <NavLink
    underline="hover"
    key="1"
    color="inherit"
    to="/dashboard/"
    style={{ textDecoration: "none", color: "GrayText" }}
  >
    Dashboard
  </NavLink>,
  <Typography key="3" sx={{ color: "text.primary" }}>
    Bookings
  </Typography>,
];
const Bookings = () => {
  const [reload,setReload] = useState(false);
  const [loading,setLoading] =useState(false);
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={12} sx={{ padding: "20px" }}>
          <Stack spacing={2}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 8, md: 10, lg: 10 }}>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                  {breadcrumbs}
                </Breadcrumbs>
              </Grid>
              <Grid size={{ xs: 4, md: 2, lg: 2 }} sx={{display:'flex', justifyContent:'flex-end'}}>
              {/* <AddServiceDialog id={organizationId.id} reload={reload} setReload={setReload}/> */}
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 12, lg: 12 }} sx={{ marginTop: "2%" }}>
        <Box sx={{ height: '60vh', width: "100%" }}>
        <Typography variant="h5" mb={3} color="primary" sx={{marginLeft:'5px'}}>Bookings</Typography>
          {
            loading ? <Progress/> :
          <></>
        }
        </Box>
      </Grid>
    </Box>
  </>
  )
}

export default Bookings