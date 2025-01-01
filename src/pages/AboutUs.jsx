import React from 'react'
import NavBar from '../components/NavBar'
import { Grid2, Typography, Box } from '@mui/material'
import Footer from '../components/Footer'
import AboutUsImg from '../assets/about_us_bg2.jpg';
import ServiceCard from '../components/Card';
import SnookerImg from '../assets/snooker.jpg'
import TennisCourtImg from '../assets/tennis_court.jpg'
import TableTennisImg from '../assets/table_tennis.jpg'

const AboutUs = () => {
  return (
    <>
      <NavBar />
      <Box>
        <Grid2 container spacing={2}>
          <Grid2
            size={12}
            style={{ backgroundColor: "lightblue" }}
            sx={{
              //backgroundImage: `url(${AboutUsImg})`,
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${AboutUsImg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "450px",
              margin: "auto",
            }}
          >
            <Grid2 size={12}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "400px",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginTop:'30px'
                  }}
                >
                  About Us
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{ color: "white", textAlign: "center", width:'80%',marginTop:'20px'}}
                >
                  At Kandy Garden club, we bring together the energy of tennis, the fast-paced excitement of table tennis, and the precision of snooker under one roof. Whether you're 
                  smashing serves, spinning the perfect shot, or sinking the black ball, we're here to make every moment unforgettable. At Kandy Garden Club, we believe in creating a space where sportsmanship, community, and fun come together. Join us to connect with fellow players, refine your skills, and make unforgettable memories.
                  Game on!
                </Typography>
              </Box>
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 container spacing={2} style={{height: { sx: "90vh", md: "50vh" }, display: "flex",justifyContent: "center",}} mt={7} mb={5}>
            <Box sx={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',marginBottom:'20px'}}>
              <Typography variant={"h5"} color="primary" mt={3}>SERVICES WE ARE PROVIDING</Typography>
            </Box>
            <Grid2 container size={12} sx={{width:'100%'}}>
              <Grid2 size={{xs:12,sm:12,md:4,lg:4}} sx={{display:'flex',justifyContent:'center', height:'430px',padding:'10px'}}>
                <ServiceCard url={TennisCourtImg} title={"Tennis"} description={"We are providing three tennis courts with different price ranges"}/>
              </Grid2>
              <Grid2 size={{xs:12,sm:12,md:4,lg:4}} sx={{display:'flex',justifyContent:'center', height:'430px',padding:'10px'}}>
                <ServiceCard url={TableTennisImg} title={"Table Tennis"} description={"We are providing two table tennis tables with different price ranges"}/>
              </Grid2>
              <Grid2 size={{xs:12,sm:12,md:4,lg:4}} sx={{display:'flex',justifyContent:'center', height:'430px',padding:'10px'}}>
                <ServiceCard url={SnookerImg} title={"Snooker"} description={"We are providing two snooker tables with different price ranges"}/>
              </Grid2>
            </Grid2>
        </Grid2>
        <Footer />
      </Box>
    </>
  )
}

export default AboutUs