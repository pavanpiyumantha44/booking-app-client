import {Grid,TextField, Button, Typography, Box } from '@mui/material';
import loginImage from '../assets/hero_bg.jpg'
import NavBar from '../components/NavBar';
import {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Footer from '../components/Footer';
import loginService from '../services/loginService';


function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const response = await loginService({email,password});
      if(response.success){
        login(response.user)
        localStorage.setItem("token",response.token);
        if(response.user){
            navigate('/dashboard');
        }
      }
    } catch (error) {
      console.log(error.response.error);
      if(error.response && !error.response.success){
        setError(error.response.error);
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
        xs={12} // Hidden on extra small screens (mobile)
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
      <Footer/>
      </>
  );
}

export default Login;
