import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import NavBar from "../components/NavBar";
import HeroImg from "../assets/bg1.jpg";
import { Button, Typography } from "@mui/material";
import Footer from "../components/Footer";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import MailIcon from "@mui/icons-material/Mail";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function BasicGrid() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/booking");
  };
  return (
    <>
      <NavBar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid
            size={12}
            style={{ backgroundColor: "lightblue" }}
            sx={{
              //backgroundImage: `url(${HeroImg})`,
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${HeroImg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "450px",
              margin: "auto",
            }}
          >
            <Grid size={12}>
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
                  variant="h2"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Welcome to Our Service
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{ color: "white", textAlign: "center" }}
                >
                  Book your appointment with ease and convenience.Your
                  satisfaction is our priority!
                </Typography>
                <Button
                  variant="contained"
                  color="info"
                  sx={{ mt: 2, width: "200px", borderRadius: "25px" }}
                  onClick={handleNavigate}
                >
                  Book Now{" "}
                  <ScheduleSendIcon
                    fontSize="small"
                    sx={{ marginLeft: "5px" }}
                  />
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          style={{
            height: { sx: "90vh", md: "50vh" },
            display: "flex",
            justifyContent: "center",
          }}
          mt={7}
          mb={5}
        >
          <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
          <Box style={{display:'flex',justifyContent:'center'}}>
            <Typography variant="h5" color="primary" my={3}>
              OPENING HOURS
            </Typography>
          </Box>
            <Item
              elevation={0}
              style={{
                height: "300px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <table style={{ width: "80%" }}>
                <thead>
                  <tr style={{ color: "tomato" }}>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                    <th>Sun</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>8 am</td>
                    <td>8 am</td>
                    <td>8 am</td>
                    <td>8 am</td>
                    <td>8 am</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>|</td>
                    <td>|</td>
                    <td>|</td>
                    <td>|</td>
                    <td>|</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>6 pm</td>
                    <td>6 pm</td>
                    <td>6 pm</td>
                    <td>6 pm</td>
                    <td>6 pm</td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <Typography
                variant="body1"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  width: "80%",
                  marginTop: "40px",
                }}
              >
                We offer a full range of services to meet your booking needs,
                ensuring a seamless and hassle-free experience. Whether you're
                scheduling appointments, reserving spaces, or managing bookings,
                our platform is designed to provide convenience and flexibility.
              </Typography>
            </Item>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
            <Box style={{display:'flex',justifyContent:'center'}}>
            <Typography variant="h5" color="primary" mt={3}>
              CONTACT
            </Typography>
            </Box>
            <Item
              elevation={0}
              style={{
                height: "240px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: "0px",
              }}
            >
            <Box style={{ display: "flex", flexDirection:'column',justifyContent:'start',alignItems:'start' }}>
              <Box mb={2} style={{display:'flex'}}>
                <PhoneEnabledIcon
                  sx={{ marginRight: "20px", fontSize: "20px" }}
                />
                <Typography variant="h7" style={{ fontWeight: "500" }}>
                  {" "}
                  0815678674
                </Typography>
              </Box>
              <Box mb={2} style={{display:'flex'}}>
                <MailIcon sx={{ marginRight: "20px", fontSize: "20px" }} />
                <Typography variant="h7" style={{ fontWeight: "500" }}>
                  {" "}
                  booking@email.com
                </Typography>
              </Box>
              <Box mb={2} style={{display:'flex'}}>
                <FacebookIcon sx={{ marginRight: "20px", fontSize: "20px" }} />
                <LinkedInIcon sx={{ marginRight: "20px", fontSize: "20px" }} />
                <XIcon sx={{ marginRight: "20px", fontSize: "20px" }} />
              </Box>
            </Box>
            </Item>
          </Grid>
          <Grid size={{xs:12,sm:12,md:4,lg:4}} sx={{paddingLeft:'20px',paddingRight:'20px'}}>
          <Box style={{display:'flex',justifyContent:'center'}}>
            <Typography variant="h5" color="primary" mt={3}>
              LOCATION
            </Typography>
            </Box>
          <Box style={{width: '100%',marginTop:'35px'}}>
            <iframe width="100%" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" borderRadius="5" title="Kandy Garden Club" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=9%20Sangaraja%20Mawatha,%20Kandy%2020000+(Kandy%20Garden%20Club)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
              <a href="https://www.gps.ie/">gps tracker sport</a>
            </iframe>
          </Box>
          </Grid>
        </Grid>
        <Footer />
      </Box>
    </>
  );
}
