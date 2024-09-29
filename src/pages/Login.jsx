import {Grid,TextField, Button, Typography, Box } from '@mui/material';
//import Grid from '@mui/material/Grid2';
import loginImage from '../assets/hero_bg.jpg'
import NavBar from '../components/NavBar';
import {useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login',{email,password});
      if(response.data.success){
        login(response.data.user)
        localStorage.setItem("token",response.data.token);
        if(response.data.user){
            navigate('/dashboard');
        }
      }
    } catch (error) {
      console.log(error.response.data.error);
      if(error.response && !error.response.data.success){
        setError(error.response.data.error);
      }
      else{
        setError("Server Error");
      }
    }
  }
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
        <Box sx={{boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', padding: '40px 40px 100px 40px', height:"40%", width:"50%", margin:'auto', borderRadius:'10px'}}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
        {error && <Typography sx={{color:'tomato'}}>{error}</Typography>}
          <TextField
            fullWidth
            label="Email"
            type='email'
            variant="outlined"
            margin="normal"
            required
            onChange={(e)=>setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            required
            onChange={(e)=>setPassword(e.target.value)}
          />
          <Button 
            variant="contained"
            type='submit' 
            fullWidth 
            color="primary"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
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
          © 2024 Company Name. All rights reserved.
        </Typography>
      </Box>
      </>
  );
}

export default Login;
