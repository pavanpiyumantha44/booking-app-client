import React, { useState } from 'react'
import axios from 'axios';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Progress from '../../utils/Progress';
import { NavLink, useParams } from 'react-router-dom';


const breadcrumbs = [
    <NavLink underline="hover" key="1" color="inherit" to="/dashboard/" style={{textDecoration:'none',color:'GrayText'}}>
      Dashboard
    </NavLink>,
    <NavLink underline="hover" key="1" color="inherit" to="/dashboard/organizations" style={{textDecoration:'none',color:'GrayText'}}>
      Service Provider
    </NavLink>,
    <Typography key="3" sx={{ color: "text.primary" }}>
      Edit Service Provider
    </Typography>,
  ];
const EditOrganization = () => {
  const [loading,setLoading] =useState(false);
  const {id} = useParams();
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 12, lg: 12 }} sx={{ padding: "20px" }}>
          <Stack spacing={2}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 8, md: 10, lg: 10 }}>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                  {breadcrumbs}
                </Breadcrumbs>
              </Grid>
              <Grid size={{ xs: 4, md: 2, lg: 2 }} sx={{display:'flex', justifyContent:'flex-end'}}>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 12, lg: 12 }} sx={{ marginTop: "2%" }}>
        <Box sx={{ height: '60vh', width: "100%" }}>
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

export default EditOrganization