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
import {
  validateBooking,
  validateEmail,
  validateMobileNumber,
  validateOverlapBookings,
} from "../../validations/validation";

const CreateBooking = ({
  openAddDialog,
  setOpenAddDialog,
  reload,
  setReload,
}) => {
  const [step, setStep] = useState(1);

  const [startDttm, setStartDttm] = useState(null);
  const [endDttm, setEndDttm] = useState(null);

  const [isSlResident, setIsSlResident] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isEquipmentsRequired, setIsEquipmentsRequired] = useState("");
  const [isCoachingSessionsRequired, setIsCoachingSessionsRequired] =
    useState("");
  const [isFloodLightsRequired, setIsFloodLightsRequired] = useState("No");
  const [selectedServiceCost, setSelectedServiceCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [timeDuration, setTimeDuration] = useState("");
  const [floodlightCost, setFloodlightCost] = useState(0);
  const [serviceDescription, setServiceDescription] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [serviceDetails, setServiceDetails] = useState([]);
  const [clientId, setClientID] = useState("");
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
            client: booking.clientId.name,
            //clientEmail : booking.clientId.email,
            //clientPhone : booking.clientId.phone,
            description: booking.serviceId.providedService,
            floodLights: booking.isFloodLightsRequired,
            isCoachingSessionRequired: booking.isCoachingSessionRequired,
            isEquipmentRequired: booking.isTennisEquipmentRequired,
            cost: booking.totalCost + " LKR",
            serviceId: booking.serviceId._id,
          }));
          setAvailableBookings(data);
          //console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
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
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleCost = (service) => {
    const filteredService = serviceDetails.filter((val) => val.id === service);
    let serviceCost = 0;
    let tennisEquipmentCost = 0;
    let coachingSessionCost = 0;
    let totalCost1 = 0;

    const startDateTime = dayjs(startDttm);
    const endDateTime = dayjs(endDttm);
    const totalDurationHours = Number(
      endDateTime.diff(startDateTime, "minute") / 60
    );

    serviceCost =
      isSlResident === "Yes"
        ? filteredService[0].localCost
        : filteredService[0].foreignCost;
    //console.log("Service Cost : "+serviceCost);
    //console.log("Total Duration Hours : "+totalDurationHours);
    const fullHours = Math.floor(totalDurationHours);
    const remainingMinutes = Number((totalDurationHours - fullHours) * 60);

    //console.log("Full Hours : "+fullHours);
    //console.log("Remain Minutes : "+remainingMinutes);
    const costForFullHours = fullHours * serviceCost;
    const costForRemainingMinutes = Number(parseFloat(
      (serviceCost / 60) * remainingMinutes).toFixed(2)
    );
    const totalCostForHourlyRate = Number(parseFloat(
      costForFullHours + costForRemainingMinutes).toFixed(2)
    );

    if(fullHours !==0 && remainingMinutes !==0){
      setTimeDuration(`${fullHours} hour(s) ${remainingMinutes} minutes`);
    }else if(fullHours !==0 && remainingMinutes ===0){
      setTimeDuration(`${fullHours} hour(s)`);
    }
    else{
      setTimeDuration(`${remainingMinutes} minutes`);
    }

    setServiceDescription(filteredService[0].providedService);
    setSelectedServiceCost(totalCostForHourlyRate);
    //console.log("Total Cost For Hourly Rate : "+totalCostForHourlyRate);

    if (isEquipmentsRequired === "Yes") {
      tennisEquipmentCost = 500;
    }
    if (isCoachingSessionsRequired === "Yes") {
      coachingSessionCost = 2000;
    }
    
    const floodlightStart = dayjs(startDttm).set('hour', 18).set('minute', 0); // 6:00 PM
    const floodlightEnd = dayjs(endDttm);
    
    let floodlightHours = 0;
    if (endDateTime.isAfter(floodlightStart)) {
      setIsFloodLightsRequired("Yes");
      const floodlightStartEffective = dayjs.max(floodlightStart, startDateTime);
      floodlightHours = floodlightEnd.diff(floodlightStartEffective, 'minute') / 60;
    }

    const floodlightCost = Number(parseFloat(Math.ceil(floodlightHours) * 1000).toFixed(2)); // Round up to the next hour
    setFloodlightCost(floodlightCost);
    //console.log("Floodlight Cost : "+floodlightCost);
    totalCost1 = parseFloat(
      totalCostForHourlyRate + tennisEquipmentCost + coachingSessionCost+floodlightCost
    ).toFixed(2);
    //console.log("Total Cost : "+totalCost1);
    return totalCost1;
  };

  const submitBooking = async () => {
    const isClientSaved = await addNewClient();
    if (isClientSaved) {
      if (isCoachingSessionsRequired === "") {
        setIsCoachingSessionsRequired("No");
      }
      if (isEquipmentsRequired === "") {
        setIsEquipmentsRequired("No");
      }
      const newBooking = {
        clientId: clientId,
        startDttm: startDttm.toString(),
        endDttm: endDttm.toString(),
        isCoachingSessionRequired:
          isCoachingSessionsRequired === "" ? "No" : isCoachingSessionsRequired,
        isTennisEquipmentRequired:
          isEquipmentsRequired === "" ? "No" : isEquipmentsRequired,
        isFloodLightsRequired: isFloodLightsRequired,
        totalCost: handleCost(service),
        serviceId: service,
      };

      try {
        const bookingResponse = await addBooking(newBooking);
        if (bookingResponse.success) {
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
  };

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
  };

  const increaseSteps = () => {
    if (step === 1) {
      if (
        isSlResident === "" ||
        service === "" ||
        startDttm === null ||
        endDttm === null
      ) {
        setErrorMsg("Please Fill All the fields");
      } else if (!validateBooking(startDttm, endDttm).isValid) {
        setErrorMsg(validateBooking(startDttm, endDttm).message);
      } else if (
        !validateOverlapBookings(startDttm, endDttm, availableBookings, service)
          .isValid
      ) {
        setErrorMsg("This time slot is already taken. Please choose a different time or a tennis court.");
      } else {
        if (
          isSlResident === "No" &&
          (isEquipmentsRequired === "" || isCoachingSessionsRequired === "")
        ) {
          setErrorMsg("Please fill all the fields");
        } else {
          setErrorMsg("");
          setStep(step + 1);
        }
      }
    }
    if (step === 2) {
      setErrorMsg("");
      if (name === "" || email === "" || phone === "") {
        setErrorMsg("Please fill all the fields");
      }else if(!validateEmail(email)){
        setErrorMsg("Email is not valid!");
      }else if(!validateMobileNumber(phone)){
        setErrorMsg("Mobile number is not valid!");
      }
      else {
        setTotalCost(handleCost(service));
        setStep(step + 1);
      }
    }
    if (step === 3) {
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
        <DialogTitle>
          <Typography color="primary" variant="h6">
            {step===1?"New Booking":""}
            {step===2?"Contact Details":""}
            {step===3?"Confirm Booking":""}
          </Typography></DialogTitle>
        <DialogContent>
          {/* <Box sx={{display:'fex',justifyContent:'space-between'}}>
            <Box sx={{borderRadius:'100%',backgroundColor:'lightblue',padding:'10px'}}>1</Box>
            <Box sx={{borderRadius:'100%',backgroundColor:'lightblue',padding:'10px 20px 0px 10px'}}>1</Box>
            <Box sx={{borderRadius:'100%',backgroundColor:'lightblue',padding:'10px 20px 0px 0px'}}>1</Box>
          </Box> */}
          {errorMsg && (
            <Box
              sx={{
                color: "white",
                backgroundColor: "tomato",
                padding: "10px",
                marginBottom: "20px",
                borderRadius: "5px",
              }}
            >
              {errorMsg}
            </Box>
          )}
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
                    <Typography color="primary" sx={{ fontWeight: "600" }}>
                      Service Details
                    </Typography>
                    <Divider sx={{ mb: "5px" }} />
                    <Grid2
                      container
                      size={12}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Grid2
                        container
                        size={6}
                        sx={{ display: "flex", justifyContent: "start" }}
                      >
                        <Typography>Start Date Time : </Typography>
                      </Grid2>
                      <Grid2
                        container
                        size={6}
                        sx={{
                          display: "flex",
                          justifyContent: "start",
                          marginRight: "10px",
                        }}
                      >
                        <Typography>
                          {dayjs(startDttm).format("MMMM D, YYYY h:mm A")}{" "}
                        </Typography>
                      </Grid2>
                    </Grid2>
                    <Grid2
                      container
                      size={12}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Grid2
                        container
                        size={6}
                        sx={{ display: "flex", justifyContent: "start" }}
                      >
                        <Typography>End Date Time :</Typography>
                      </Grid2>
                      <Grid2
                        container
                        size={6}
                        sx={{
                          display: "flex",
                          justifyContent: "start",
                          marginRight: "10px",
                        }}
                      >
                        <Typography>
                          {dayjs(endDttm).format("MMMM D, YYYY h:mm A")}{" "}
                        </Typography>
                      </Grid2>
                    </Grid2>
                    <Grid2
                      container
                      size={12}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Grid2
                        container
                        size={6}
                        sx={{ display: "flex", justifyContent: "start" }}
                      >
                        <Typography>Selected Service :</Typography>
                      </Grid2>
                      <Grid2
                        container
                        size={6}
                        sx={{
                          display: "flex",
                          justifyContent: "start",
                          marginRight: "10px",
                        }}
                      >
                        <Typography>
                          {serviceDescription}
                        </Typography>
                      </Grid2>
                    </Grid2>
                    <Grid2
                      container
                      size={12}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Grid2
                        container
                        size={6}
                        sx={{ display: "flex", justifyContent: "start" }}
                      >
                        <Typography>Time Duration :</Typography>
                      </Grid2>
                      <Grid2
                        container
                        size={6}
                        sx={{
                          display: "flex",
                          justifyContent: "start",
                          marginRight: "10px",
                        }}
                      >
                        <Typography>
                          {timeDuration}
                        </Typography>
                      </Grid2>
                    </Grid2>
                    {/* <Typography>Service: {serviceDetails.filter(val=>val.id === service)}</Typography> */}
                    <Divider sx={{ mb: "5px" }} />
                    <Grid2
                      container
                      size={12}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Grid2
                        container
                        size={6}
                        sx={{ display: "flex", justifyContent: "start" }}
                      >
                        <Typography>Name:</Typography>
                      </Grid2>
                      <Grid2
                        container
                        size={6}
                        sx={{
                          display: "flex",
                          justifyContent: "start",
                          marginRight: "10px",
                        }}
                      >
                        <Typography>{name}</Typography>
                      </Grid2>
                    </Grid2>
                    <Grid2
                      container
                      size={12}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Grid2
                        container
                        size={6}
                        sx={{ display: "flex", justifyContent: "start" }}
                      >
                        <Typography>Email:</Typography>
                      </Grid2>
                      <Grid2
                        container
                        size={6}
                        sx={{
                          display: "flex",
                          justifyContent: "start",
                          marginRight: "10px",
                        }}
                      >
                        <Typography>{email}</Typography>
                      </Grid2>
                    </Grid2>
                    <Grid2
                      container
                      size={12}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Grid2
                        container
                        size={6}
                        sx={{ display: "flex", justifyContent: "start" }}
                      >
                        <Typography>Phone:</Typography>
                      </Grid2>
                      <Grid2
                        container
                        size={6}
                        sx={{
                          display: "flex",
                          justifyContent: "start",
                          marginRight: "10px",
                        }}
                      >
                        <Typography>{phone}</Typography>
                      </Grid2>
                    </Grid2>
                    <Grid2
                      container
                      size={12}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Grid2
                        container
                        size={6}
                        sx={{ display: "flex", justifyContent: "start" }}
                      >
                        <Typography>SL Resident:</Typography>
                      </Grid2>
                      <Grid2
                        container
                        size={6}
                        sx={{
                          display: "flex",
                          justifyContent: "start",
                          marginRight: "10px",
                        }}
                      >
                        <Typography>{isSlResident}</Typography>
                      </Grid2>
                    </Grid2>
                  </Grid2>
                  <Grid2
                    size={{ xs: 12, sm: 12, md: 6, lg: 6 }}
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <Typography color="primary" sx={{ fontWeight: "600" }}>
                      Booking Costs
                    </Typography>
                    <Divider sx={{ mb: "5px" }} />
                    <Grid2
                      container
                      size={12}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Grid2
                        size={6}
                        sx={{ display: "flex", justifyContent: "start" }}
                      >
                        <Typography>Service Cost :</Typography>
                      </Grid2>
                      <Grid2
                        size={6}
                        sx={{
                          display: "flex",
                          justifyContent: "start",
                          marginRight: "10px",
                        }}
                      >
                        <Typography>{selectedServiceCost} LKR</Typography>
                      </Grid2>
                    </Grid2>

                    {/* <Typography color="primary" sx={{ fontWeight: "600" }}>
                      Additional Cost
                    </Typography> */}
                    <Divider sx={{ mb: "5px" }} />
                    <Grid2
                      container
                      size={12}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Grid2
                        size={6}
                        sx={{ display: "flex", justifyContent: "start" }}
                      >
                        <Typography>Tennis Equipment :</Typography>
                      </Grid2>
                      <Grid2
                        size={6}
                        sx={{
                          display: "flex",
                          justifyContent: "start",
                          marginRight: "10px",
                        }}
                      >
                        <Typography>
                          {isEquipmentsRequired === "Yes" ? 500 : 0} LKR
                        </Typography>
                      </Grid2>
                    </Grid2>
                    <Grid2
                      container
                      size={12}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Grid2
                        size={6}
                        sx={{ display: "flex", justifyContent: "start" }}
                      >
                        <Typography>Coaching Session :</Typography>
                      </Grid2>
                      <Grid2
                        size={6}
                        sx={{
                          display: "flex",
                          justifyContent: "start",
                          marginRight: "10px",
                        }}
                      >
                        <Typography>
                          {isCoachingSessionsRequired === "Yes" ? 2000 : 0} LKR
                        </Typography>
                      </Grid2>
                    </Grid2>
                    <Grid2
                      container
                      size={12}
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Grid2
                        size={6}
                        sx={{ display: "flex", justifyContent: "start" }}
                      >
                        <Typography>Flood Lights :</Typography>
                      </Grid2>
                      <Grid2
                        size={6}
                        sx={{
                          display: "flex",
                          justifyContent: "start",
                          marginRight: "10px",
                        }}
                      >
                        <Typography>
                          {isFloodLightsRequired === "Yes" ? floodlightCost : 0} LKR
                        </Typography>
                      </Grid2>
                    </Grid2>
                    <Divider sx={{ mb: "5px" }} />
                    <Grid2
                      container
                      size={12}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: "20px",
                      }}
                    >
                      <Grid2
                        size={6}
                        sx={{ display: "flex", justifyContent: "start" }}
                      >
                        <Typography
                          color="success"
                          variant={{xs:"h6",sm:"h6",md:"h5",lg:"h5"}}
                          style={{ fontWeight: "bold" }}
                        >
                          Total Amount :
                        </Typography>
                      </Grid2>
                      <Grid2
                        size={6}
                        sx={{
                          display: "flex",
                          justifyContent: "start",
                          marginRight: "10px",
                        }}
                      >
                        <Typography
                          color="success"
                          variant={{xs:"h6",sm:"h6",md:"h5",lg:"h5"}}
                          style={{ fontWeight: "bold" }}
                        >
                          {totalCost} LKR
                        </Typography>
                      </Grid2>
                    </Grid2>
                  </Grid2>
                </Grid2>
              </>
            ) : (
              <></>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Grid2 container size={12} p={1}>
            <Grid2 size={6}>
              <Button
                variant={step === 1 ? "outlined" : "contained"}
                disabled={step === 1 ? true : false}
                onClick={decreaseSteps}
              >
                Back
              </Button>
            </Grid2>
            <Grid2 size={6} sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                variant={step === 3 ? "contained" : "contained"}
                color={step === 3 ? "success" : "primary"}
                // disabled={step === 3 ? true : false}
                onClick={increaseSteps}
              >
                {step === 3 ? "Confirm Booking" : "Next"}
              </Button>
            </Grid2>
          </Grid2>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateBooking;
