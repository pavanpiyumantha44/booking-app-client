import React from "react";
import NavBar from "../components/NavBar";
import Footer from '../components/Footer';
import {
  Box,
  Button,
  IconButton,
  List,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import HeroImg from '../assets/hm.jpeg'
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = ()=>{
    navigate('/booking');
  }
  return (
    <>
    <NavBar/>
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column'}}>
      
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid
          item 
          xs={12} 
          sm={8} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            padding: 3
          }}
        >
          <Box sx={{paddingLeft:'50px'}}>
          <Typography variant="h3" gutterBottom color="primary">
            Welcome to Our Service
          </Typography>
          <Typography variant="body1" gutterBottom>
            Book your appointment with ease and convenience.<br/>Your satisfaction is our priority!
          </Typography>
            <Button 
              variant="contained"  
              color="info"
              sx={{ mt: 2, width:'50%' }}
              onClick={handleNavigate}
            >
              Book <ScheduleSendIcon fontSize="small" sx={{marginLeft:'5px'}}/>
            </Button>
          </Box>
        </Grid>
        
        {/* Right side: Image (hidden on mobile) */}
        <Grid
          item
          xs={false}
          sm={4}
          sx={{
            backgroundImage: `url(${HeroImg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          width: '600px',
          height: '500px',
          margin: 'auto',
          marginTop:'6%',
          }}
        />
      </Grid>
      {/* <Box sx={{ height: '50vh', display: 'flex', flexDirection: 'column' }}>
        <Grid container sx={{ flexGrow: 1 }}>
        <Grid
          item 
          xs={12} 
          sm={6} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            padding: 3
          }}
        >
          <Box sx={{paddingLeft:'250px'}}>
          <Typography variant="h4" gutterBottom color="primary" sx={{marginLeft:'50px'}}>
            Open
          </Typography>
          <Typography variant="h6" gutterBottom sx={{marginLeft:'50px'}}>
            MON - FRI         8.00AM - 4.00PM<br/>
            SAT - SUN         9.00AM - 5.00PM
          </Typography>
          </Box>
        </Grid>
        <Grid
          item 
          xs={12} 
          sm={6} 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            padding: 3
          }}
        >
          <Box sx={{padding:'auto'}} sx={{border:'1px solid black'}}>
          <Typography variant="h4" gutterBottom color="primary" sx={{marginLeft:'50px'}}>
            Open
          </Typography>
          <Typography variant="h6" gutterBottom sx={{marginLeft:'50px'}}>
            MON - FRI         8.00AM - 4.00PM<br/>
            SAT - SUN         9.00AM - 5.00PM
          </Typography>
          </Box>
        </Grid>
        </Grid>
      </Box> */}

      {/* Footer Section */}
      <Footer/>
    </Box>
    </>
  );
};

export default Home;
