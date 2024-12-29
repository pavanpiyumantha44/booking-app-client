import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { getAllServiceDetails } from "../../services/serviceDetailsService";
import { addClient } from "../../services/clientService";
import { addBooking, getAllBookings } from "../../services/bookingService";
import { validateBooking, validateOverlapBookings } from "../../validations/validation";

const CreateBooking = ({ openAddDialog, setOpenAddDialog, reload, setReload }) => {
  const [step, setStep] = useState(1);

  const [startDttm, setStartDttm] = useState(null);
  const [endDttm, setEndDttm] = useState(null);

  const [isSlResident, setIsSlResident] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isEquipmentsRequired, setIsEquipmentsRequired] = useState("");
  const [isCoachingSessionsRequired, setIsCoachingSessionsRequired] = useState("");
  const [isFloodLightsRequired, setIsFloodLightsRequired] = useState("No");
  const [totalCost, setTotalCost] = useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [serviceDetails, setServiceDetails] = useState([]);
  const [clientId,setClientID] = useState("");
  // const formatDateTime = (date) => {
  //   return dayjs(date).format("MMMM D, YYYY h:mm A"); // Example: October 7, 2024 3:00 PM
  // };

  const [availableBookings, setAvailableBookings] = useState([]);

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
            localCost: detail.localCost,
            foreignCost: detail.foreignCost,
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
          const data = await bookingsResponse.bookings.map((booking) => ({
            id: booking._id,
            start: dayjs(booking.startDttm).toDate(),
            end: dayjs(booking.endDttm).toDate(),
            client : booking.clientId.name,
            //clientEmail : booking.clientId.email,
            //clientPhone : booking.clientId.phone,
            description: booking.serviceId.providedService,
            floodLights: booking.isFloodLightsRequired,
            isCoachingSessionRequired: booking.isCoachingSessionRequired,
            isEquipmentRequired: booking.isTennisEquipmentRequired,
            cost: booking.totalCost+" LKR",
            serviceId: booking.serviceId._id,
          }));
          setAvailableBookings(data);
          //console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getBookings();
    getServiceDetails();
  }, []);

  const addNewClient = async () => {
    const client = {
      name: name,
      email: email,
      phone: phone,
      isSlResident: isSlResident,
    };
    try {
      const clientResponse = await addClient(client);
      if (clientResponse.success) {
        setClientID(clientResponse.client._id);
      }
    } catch (error) {
      console.log(error); 
    }
    
  }

  const handleCost = (service) => {
    const filteredService = serviceDetails.filter((val) => val.id === service);
    let serviceCost= 0;
    let tennisEquipmentCost = 0;
    let coachingSessionCost = 0;
    let totalCost1 = 0;

    const startDateTime = dayjs(startDttm);
    const endDateTime = dayjs(endDttm);
    const durationMinutes = Number(endDateTime.diff(startDateTime, 'minute'))/30;
    console.log(durationMinutes);
    if(isSlResident === "Yes"){
       serviceCost = filteredService[0].localCost*durationMinutes;
    }
    else{
       serviceCost = filteredService[0].foreignCost*durationMinutes;  
    }
    if(isEquipmentsRequired === "Yes"){
      tennisEquipmentCost = 500;
    }
    if(isCoachingSessionsRequired === "Yes"){
      coachingSessionCost = 2000;
    }
    totalCost1 = parseFloat(serviceCost+tennisEquipmentCost+coachingSessionCost);
    return totalCost1;
  }

  const submitBooking = async() => {
    if(isCoachingSessionsRequired === ""){
      setIsCoachingSessionsRequired("No");
    }
    if(isEquipmentsRequired === ""){
        setIsEquipmentsRequired("No");
    }
    const newBooking = {
      clientId:clientId,
      startDttm:startDttm.toString(),
      endDttm:endDttm.toString(),
      isCoachingSessionRequired:isCoachingSessionsRequired === "" ? "No" : isCoachingSessionsRequired,
      isTennisEquipmentRequired:isEquipmentsRequired === "" ? "No" : isEquipmentsRequired,
      isFloodLightsRequired:isFloodLightsRequired,
      totalCost:handleCost(service),
      serviceId:service,
    }

    try {
      const bookingResponse = await addBooking(newBooking);
      if(bookingResponse.success){
        console.log(bookingResponse);
        clearFields();
        setStep(1);
        setReload(!reload);
        setOpenAddDialog(false);
    }
    } catch (error) {
      console.log(error);
    }
  }
  
  const clearFields = () => {
    setStartDttm(null);
    setEndDttm(null);
    setIsSlResident("");
    setIsEquipmentsRequired("");
    setIsCoachingSessionsRequired("");
    setName("");
    setEmail("");
    setPhone("");
    setService("");
  }

  const increaseSteps = () => {
    if (step === 1) 
    {
      if (isSlResident === "" || service === "" || startDttm === null || endDttm === null) {
        setErrorMsg("Please Fill All the fields");
      }
      else if(!validateBooking(startDttm,endDttm).isValid){
        setErrorMsg(validateBooking(startDttm,endDttm).message);
      }
      else if(!validateOverlapBookings(startDttm,endDttm,availableBookings,service).isValid){
        setErrorMsg(validateOverlapBookings(startDttm,endDttm,availableBookings,service).message);
      } 
      else {
        if (
          isSlResident === "No" &&
          (isEquipmentsRequired === "" || isCoachingSessionsRequired === "")
        ) {
          setErrorMsg("Please Fill All the fields");
        } else {
          setErrorMsg("");
          setStep(step + 1);
        }
      }
    }
    if (step === 2) {
      setErrorMsg("");
      if (name === "" || email === "" || phone === "") {
        setErrorMsg("Please Fill All the fields");
      } else {
        addNewClient();
        setTotalCost(handleCost(service));
        setStep(step + 1);
      }
    }
    if(step === 3){
      submitBooking();
    }
  };
  const decreaseSteps = () => {
    setErrorMsg("");
    setStep(step - 1);
  };

  return (
    <>
      <Dialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add New Booking</DialogTitle>
        <DialogContent>
          {/* <Box sx={{display:'fex',justifyContent:'space-between'}}>
            <Box sx={{borderRadius:'100%',backgroundColor:'lightblue',padding:'10px'}}>1</Box>
            <Box sx={{borderRadius:'100%',backgroundColor:'lightblue',padding:'10px 20px 0px 10px'}}>1</Box>
            <Box sx={{borderRadius:'100%',backgroundColor:'lightblue',padding:'10px 20px 0px 0px'}}>1</Box>
          </Box> */}
          {errorMsg && <Box sx={{ color: "white", backgroundColor:"tomato", padding:"10px",marginBottom:'20px',borderRadius:'5px' }}>{errorMsg}</Box>}
          <Box>
            {step === 1 ? (
              <>
                <Grid2 container size={12} spacing={2}>
                  <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <DateTimePicker
                          label="Start Date Time"
                          value={startDttm}
                          defaultDateTime={new Date()}
                          onChange={(newValue) => setStartDttm(newValue)}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <DateTimePicker
                          label="End Date Time"
                          value={endDttm}
                          defaultDateTime={new Date()}
                          onChange={(newValue) => setEndDttm(newValue)}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid2>
                  <Grid2 size={12}>
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
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                      >
                        {serviceDetails.length > 0 ? (
                          serviceDetails.map((val, key) => (
                            <MenuItem value={val.id} key={key}>
                              {`${val.service} - ${val.providedService}`}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem disabled>No services available</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </Grid2>
                  <Grid2 size={12}>
                    <FormControl fullWidth sx={{ mt: "10px" }}>
                      <InputLabel
                        id="demo-simple-select-label"
                        sx={{ bgcolor: "white" }}
                      >
                        Are you a Sri Lankan resident?
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={isSlResident}
                        onChange={(e) => setIsSlResident(e.target.value)}
                      >
                        <MenuItem value={"Yes"}>Yes</MenuItem>
                        <MenuItem value={"No"}>No</MenuItem>
                      </Select>
                    </FormControl>
                    {isSlResident === "No" ? (
                      <>
                        <FormControl fullWidth sx={{ mt: "10px" }}>
                          <InputLabel
                            id="demo-simple-select-label"
                            sx={{ bgcolor: "white" }}
                          >
                            Do you require tennis equipment?
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={isEquipmentsRequired}
                            onChange={(e) =>
                              setIsEquipmentsRequired(e.target.value)
                            }
                          >
                            <MenuItem value={"Yes"}>Yes</MenuItem>
                            <MenuItem value={"No"}>No</MenuItem>
                          </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ mt: "10px" }}>
                          <InputLabel
                            id="demo-simple-select-label"
                            sx={{ bgcolor: "white" }}
                          >
                            Do you require a coaching session?
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={isCoachingSessionsRequired}
                            onChange={(e) =>
                              setIsCoachingSessionsRequired(e.target.value)
                            }
                          >
                            <MenuItem value={"Yes"}>Yes</MenuItem>
                            <MenuItem value={"No"}>No</MenuItem>
                          </Select>
                        </FormControl>
                      </>
                    ) : (
                      <></>
                    )}
                  </Grid2>
                </Grid2>
                <Divider />
              </>
            ) : (
              <></>
            )}
            {step === 2 ? (
              <>
                <Grid2 container size={12} spacing={2}>
                  <TextField
                    required
                    margin="dense"
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    required
                    margin="dense"
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    required
                    margin="dense"
                    name="phone"
                    label="Contact Number"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid2>
              </>
            ) : (
              <></>
            )}
            {step === 3 ? (
              <>
                <Grid2 container size={12} spacing={2}>
                  <Grid2
                    size={{ xs: 12, sm: 12, md: 6, lg: 6 }}
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <Typography>
                      StartDttm:{" "}
                      {dayjs(startDttm).format("MMMM D, YYYY h:mm A")}
                    </Typography>
                    <Typography>
                      EndDttm: {dayjs(endDttm).format("MMMM D, YYYY h:mm A")}
                    </Typography>
                    <Typography>SL Resident: {isSlResident}</Typography>
                    <Typography>Name: {name}</Typography>
                    <Typography>Email: {email}</Typography>
                    <Typography>Phone: {phone}</Typography>
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                    <Box
                      sx={{
                        width: "90%",
                        borderRadius: "10px",
                        height: "150px",
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        flexDirection: "column",
                        backgroundColor: "darkgreen",
                        padding: "20px",
                        color: "lightgray",
                      }}
                    >
                      <Typography variant="body1"></Typography>
                      <Typography variant="body1"></Typography>
                      <Typography variant="h3" mt={4}>
                        Total : {totalCost} LKR
                      </Typography>
                    </Box>
                  </Grid2>
                </Grid2>
              </>
            ) : (
              <></>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Grid2 container size={12} p={2}>
            <Grid2 size={6}>
              <Button
                variant={step === 1 ? "outlined" : "contained"}
                disabled={step === 1 ? true : false}
                onClick={decreaseSteps}
              >
                Back
              </Button>
            </Grid2>
            <Grid2 size={6} sx={{display:'flex',justifyContent:'end'}}>
              <Button
                variant={step === 3 ? "contained" : "contained"}
                color={step === 3? "success":"primary"}
                // disabled={step === 3 ? true : false}
                onClick={increaseSteps}
              >
                {step===3?"Confirm Booking" : "Next"}
              </Button>
            </Grid2>
          </Grid2>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateBooking;
