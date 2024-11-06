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

const CreateBooking = ({ openAddDialog, setOpenAddDialog }) => {
  const [step, setStep] = useState(1);

  const [startDttm, setStartDttm] = useState(null);
  const [endDttm, setEndDttm] = useState(null);

  const [isSlResident, setIsSlResident] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isEquipmentsRequired, setIsEquipmentsRequired] = useState("");
  const [isCoachingSessionsRequired, setIsCoachingSessionsRequired] =
    useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [serviceDetails, setServiceDetails] = useState([]);
  // const formatDateTime = (date) => {
  //   return dayjs(date).format("MMMM D, YYYY h:mm A"); // Example: October 7, 2024 3:00 PM
  // };

  useEffect(() => {
    const getServiceDetails = async () => {
      try {
        const response = await getAllServiceDetails(); // Make sure this function returns the expected response
        if (response.success) {
          const data = await response.serviceDetails.map((detail) => ({
            id: detail._id,
            serviceId: detail.serviceId._id,
            service: detail.serviceId.name,
            providedService: detail.providedService,
            description: detail.description,
            isAvailable: detail.isAvailable,
          }));
          setServiceDetails(data); // This should update your state correctly
        }
      } catch (error) {
        console.log(error);
      }
    };
    getServiceDetails();
  }, []);

  const increaseSteps = () => {
    if (step === 1) {
      if (isSlResident === "") {
        setErrorMsg("Please Fill All the fileds");
      } else {
        if (
          isSlResident === "No" &&
          (isEquipmentsRequired === "" || isCoachingSessionsRequired === "")
        ) {
          setErrorMsg("Please Fill All the fileds");
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
        setStep(step + 1);
      }
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
          {errorMsg && <Box sx={{ color: "tomato" }}>{errorMsg}</Box>}
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
                              {val.service + " - " + val.providedService}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem disabled>No services available</MenuItem>
                        )}
                        {/* <MenuItem value={"Yes"}>Yes</MenuItem>
                        <MenuItem value={"No"}>No</MenuItem> */}
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
                        Total : {2500} LKR
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
            <Grid2 size={6}>
              <Button
                variant={step === 3 ? "outlined" : "contained"}
                disabled={step === 3 ? true : false}
                onClick={increaseSteps}
              >
                Next
              </Button>
            </Grid2>
          </Grid2>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateBooking;
