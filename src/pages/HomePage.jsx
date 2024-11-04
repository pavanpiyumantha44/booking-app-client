import React, { useEffect, useState } from "react";
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
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from "react-router-dom";
import { getOrganizations } from "../services/organizationService";

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
  const [organization, setOrganization] = useState({});
  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const organizationResponse = await getOrganizations();
        if (organizationResponse) {
          const data = {
            id: organizationResponse.organizations[0]._id,
            name: organizationResponse.organizations[0].name,
            email: organizationResponse.organizations[0].email,
            phone: organizationResponse.organizations[0].phone,
            address: organizationResponse.organizations[0].address,
            startingTime: organizationResponse.organizations[0].startingTime,
            closingTime: organizationResponse.organizations[0].closingTime,
          };
          setOrganization(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrganization();
  }, []);
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
                  variant="h3"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Welcome to the Kandy Garden Club <br /> Service Booking Portal
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  style={{ color: "white", textAlign: "center" }}
                >
                  Book your tennis appointment with ease and convenience. Your
                  satisfaction is our priority.
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
            <Box style={{ display: "flex", justifyContent: "center" }}>
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
                    {organization.startingTime ? (
                      Array.from({ length: 7 }).map((_, index) => (
                        <td key={index}>{organization.startingTime} am</td>
                      ))
                    ) : (
                      <>
                        <td>6 am</td>
                        <td>6 am</td>
                        <td>6 am</td>
                        <td>6 am</td>
                        <td>6 am</td>
                        <td>6 am</td>
                        <td>6 am</td>
                      </>
                    )}
                  </tr>
                  <tr>
                    <td>|</td>
                    <td>|</td>
                    <td>|</td>
                    <td>|</td>
                    <td>|</td>
                    <td>|</td>
                    <td>|</td>
                  </tr>
                  <tr>
                    {organization.closingTime ? (
                      Array.from({ length: 7 }).map((_, index) => (
                        <td key={index}>{organization.closingTime} pm</td>
                      ))
                    ) : (
                      <>
                        <td>9 pm</td>
                        <td>9 pm</td>
                        <td>9 pm</td>
                        <td>9 pm</td>
                        <td>9 pm</td>
                        <td>9 pm</td>
                        <td>9 pm</td>
                      </>
                    )}
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
            <Box style={{ display: "flex", justifyContent: "center" }}>
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
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "start",
                }}
              >
                <Box mb={2} style={{ display: "flex" }}>
                  <PhoneEnabledIcon
                    sx={{ marginRight: "20px", fontSize: "20px" }}
                  />
                  <Typography variant="h7" style={{ fontWeight: "500" }}>
                    {" "}
                    {organization.phone ? organization.phone : "0812222675"}
                  </Typography>
                </Box>
                {/* <Box mb={2} style={{ display: "flex" }}>
                  <MailIcon sx={{ marginRight: "20px", fontSize: "20px" }} />
                  <Typography variant="h7" style={{ fontWeight: "500" }}>
                    {" "}
                    booking@email.com
                  </Typography>
                </Box> */}
                <Box mb={2} style={{ display: "flex" }}>
                  <HomeIcon sx={{ marginRight: "20px", fontSize: "20px" }} />
                  <Typography variant="h7" style={{ fontWeight: "500" }}>
                    {" "}
                    {organization.phone ? organization.address : "9 Sangaraja Mawatha, Kandy 20000"}
                  </Typography>
                </Box>
                <Box mb={2} style={{ display: "flex" }}>
                  <Link to="https://web.facebook.com/people/Kandy-Garden-Club/61554364246124/?mibextid=ZbWKwL">
                    <FacebookIcon
                      sx={{
                        marginRight: "20px",
                        fontSize: "20px",
                        color: "grey",
                      }}
                    />
                  </Link>
                  <LinkedInIcon
                    sx={{ marginRight: "20px", fontSize: "20px" }}
                  />
                  <XIcon sx={{ marginRight: "20px", fontSize: "20px" }} />
                </Box>
              </Box>
            </Item>
          </Grid>
          <Grid
            size={{ xs: 12, sm: 12, md: 4, lg: 4 }}
            sx={{ paddingLeft: "20px", paddingRight: "20px" }}
          >
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="h5" color="primary" mt={3}>
                LOCATION
              </Typography>
            </Box>
            <Box style={{ width: "100%", marginTop: "35px" }}>
              <iframe
                width="100%"
                height="350"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                borderRadius="5"
                title="Kandy Garden Club"
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=9%20Sangaraja%20Mawatha,%20Kandy%2020000+(Kandy%20Garden%20Club)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              >
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
