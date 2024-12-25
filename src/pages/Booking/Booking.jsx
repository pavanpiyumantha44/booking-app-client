import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Box, Button, Grid2, Typography } from "@mui/material";
import BigCalendar from "../../components/BigCalendar";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { getAllServices } from "../../services/provideService";
import { getAllServiceDetails } from "../../services/serviceDetailsService";
import CreateBooking from "./CreateBooking";
import { getAllBookings } from "../../services/bookingService";
import dayjs from "dayjs";

const Booking = () => {
  const [serviceDetails, setServiceDetails] = useState([]);
  const [selectedServiceDetails, setSelectedServiceDetails] = useState("");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [reload,setReload] = useState(false);

  useEffect(() => {
    const getServiceDetails = async () => {
      try {
        const response = await getAllServiceDetails();
        if (response.success) {
          const data = await response.serviceDetails.map((detail) => ({
            id: detail._id,
            serviceId: detail.serviceId._id,
            service: detail.serviceId.name,
            providedService: detail.providedService,
            description: detail.description,
            isAvailable: detail.isAvailable,
          }));
          setServiceDetails(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getBookings = async () => {
      try {
        const bookingsResponse = await getAllBookings();
        if (bookingsResponse.success) {
          // const data = await bookingsResponse.bookings.map((booking) => ({
          //   id: booking._id,
          //   startDttm: booking.startDttm,
          //   endDttm: booking.endDttm,
          //   clientName : booking.clientId.name,
          //   clientEmail : booking.clientId.email,
          //   clientPhone : booking.clientId.phone,
          //   service: booking.booking.serviceId.providedService,
          // }));
          const data = await bookingsResponse.bookings.map((booking) => ({
            id: booking._id,
            start: dayjs(booking.startDttm).toDate(),
            end: dayjs(booking.endDttm).toDate(),
            title: booking.serviceId.providedService,
            clientName : booking.clientId.name,
            clientEmail : booking.clientId.email,
            clientPhone : booking.clientId.phone,
            color: getRandomColor(),
          }));
          setBookings(data);
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getServiceDetails();
    getBookings();
  }, [reload]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
  return (
    <>
      <NavBar />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          marginBottom:'4%'
        }}
      >
        <Box
          sx={{
            width: "60%",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            paddingLeft: "10%",
          }}
          mt={10}
        >
          <Typography variant="h5" color="primary">
            SELECT BOOKING TYPE
          </Typography>
        </Box>
        <Box sx={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
          <Grid2 container spacing={2} mt={3}>
            <Grid2 size={8}>
              <FormControl fullWidth sx={{ mt: "10px" }}>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ bgcolor: "white" }}
                >
                  Select Service
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedServiceDetails}
                  onChange={(e) => setSelectedServiceDetails(e.target.value)}
                >
                  {serviceDetails.length > 0 ? (
                    serviceDetails.map((val, key) => (
                      <MenuItem value={val.id} key={key}>
                        {val.service + " - " + val.providedService}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No services available</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2
              size={4}
              sx={{ height: "50px", display: "flex", alignItems: "center" }}
              my={2}
            >
              <Button variant="contained" color="primary">
                Filter
              </Button>
              <Button variant="contained" color="primary" sx={{marginLeft:'10px'}} onClick={()=>setOpenAddDialog(true)}>
                Add booking
              </Button>
            </Grid2>
          </Grid2>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "80%",
            marginLeft:'auto',
            marginRight:'auto',
          }}
        >
          <CreateBooking openAddDialog={openAddDialog} setOpenAddDialog={setOpenAddDialog} reload={reload} setReload={setReload}/>
          <BigCalendar bookingList={bookings}/>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Booking;
