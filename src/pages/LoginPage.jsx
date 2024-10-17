import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import loginService from "../services/loginService";
import { Button,TextField, Typography } from "@mui/material";
import Footer from "../components/Footer";
import LoginImg from "./../assets/bg.jpg";
import CircularProgress from '@mui/material/CircularProgress';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isProcessing,setIsProcessing] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const response = await loginService({ email, password });
      if (response.success) {
        login(response.user);
        localStorage.setItem("token", response.token);
        if (response.user) {
          navigate("/dashboard");
          setIsProcessing(false);
        }
      }
    } catch (error) {
      if (error) {
        setIsProcessing(false);
        setError(error);
      } else {
        setError("Server Error");
      }
    }
  };
  return (
    <>
      <NavBar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          sx={{
            height: "90vh",
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${LoginImg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",

            margin: "auto",
          }}
        >
          <Grid
            size={{ md: 6, lg: 6 }}
            sx={{
              display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
              justifyContent: "center",
              alignItems: "center",
              textAlign:'center',
            }}
          >
            <Box style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}>
              <Typography
                variant="h1"
                style={{ color: "white", fontWeight: "bold" }}
              >
                Where Your Next Game Begins!
              </Typography>
            </Box>
          </Grid>
          <Grid
            size={{ xs: 12, sm: 12, md: 6, lg: 6 }}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Box
              sx={{
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                padding: "40px 40px 100px 40px",
                height: "35%",
                width: "50%",
                margin: "auto",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            >
              <form onSubmit={handleSubmit}>
                <Typography variant="h4" gutterBottom>
                  Login
                </Typography>
                {error && (
                  <Typography sx={{ color: "tomato" }}>{error}</Typography>
                )}
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  margin="normal"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  color="primary"
                  sx={{ my: 2 }}
                  disabled={isProcessing}
                >
                  {isProcessing ? <span>Verifying...</span> : "Login"}
                </Button>
              </form>
              <Link to={""} style={{ color: "darkblue" }}>
              Forgot Password?
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default LoginPage;
