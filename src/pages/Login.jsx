import {Grid,TextField, Button, Typography, Box } from '@mui/material';
//import Grid from '@mui/material/Grid2';
import loginImage from '../assets/hero_bg.jpg'
import NavBar from '../components/NavBar';

function Login() {
  return (
    <>
    <NavBar/>
    <Grid container sx={{ height: '90vh' }}>
      
      <Grid
        item
        xs={false} // Hidden on extra small screens (mobile)
        sm={6}    // Shown on small screens and above
        sx={{
          backgroundImage: `url(${loginImage})`, // Replace with your image
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          width: '80%',  // Explicit width
          height: '80%',
          margin: 'auto'
        }}
      />

      {/* Left side: Login form */}
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
        <Box sx={{boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', paddingTop:'40px',paddingLeft:'40px',paddingRight:'40px',paddingBottom:'120px', height:"40%", width:"50%", margin:'auto', borderRadius:'10px'}}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
          />
          <Button 
            variant="contained" 
            fullWidth 
            color="primary"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
      </Grid>
    
    </Grid>
      <Box 
        component="footer" 
        sx={{ 
          backgroundColor: 'black', 
          color: 'white',
          height:'100px', 
          textAlign: 'center', 
          padding: '10px' 
        }}
      >
        <Typography variant="body2" sx={{marginTop:'50px'}}>
          © 2024 Your Company Name. All rights reserved.
        </Typography>
      </Box>
      </>
  );
}

export default Login;
