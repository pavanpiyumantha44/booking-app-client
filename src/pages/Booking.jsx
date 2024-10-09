import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Box, Grid2, Typography } from "@mui/material";
import BigCalendar from "../components/BigCalendar";



const Booking = () => {

  return (
    <>
      <NavBar />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: 'column'
        }}
      >
      <Box  sx={{
          width:'60%',
          display: "flex",
          justifyContent:'start',
          alignItems:'center',
          paddingLeft:'10%'
        }} mt={10}>
       <Typography variant="h5" color="primary">SELECT BOOKING TYPE</Typography>
      </Box>
       <Box  sx={{
          display: "flex",
          justifyContent:'center',
          alignItems:'center',
          width:'100%'
        }}>
       <BigCalendar/>
       </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Booking;
