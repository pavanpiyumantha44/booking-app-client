import React, { useEffect, useState } from "react";
import { Box, Dialog, DialogContent, DialogTitle, Grid2 } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import dayjs from "dayjs";
import { getAllServiceDetails } from "../../services/serviceDetailsService";

const steps = ["Services","User Info", "Complete Booking"];
const AddBooking = ({
  openAddDialog,
  setOpenAddDialog,
  handleAddEvent,
  startDttm,
  endDttm,
  newEvent,
  setNewEvent
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [serviceDetails, setServiceDetails] = useState([]);
  const [startValue, setStartValue] = React.useState(dayjs("2024-10-06T15:30"));
  const [endValue, setEndValue] = React.useState(dayjs("2024-10-06T16:00"));

  //user Inputs
  const [isSlRecident, setIsSlRecident] = useState("");
  const [isEquipmentsRequired, setIsEquipmentsRequired] = useState("");
  const [isCoachingSessionsRequired, setIsCoachingSessionsRequired] = useState("");
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');

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

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handleSubmit = () => {};
  const [sl, setSl] = useState("");

  const formatDateTime = (date) => {
    return dayjs(date).format("MMMM D, YYYY h:mm A"); // Example: October 7, 2024 3:00 PM
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
          <Box
            sx={{
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              paddingTop: "30px",
            }}
          >
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <div style={{ padding: "40px" }}>
              {allStepsCompleted() ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                    {/* Step {activeStep + 1} */}</Typography>
                    {activeStep == 0 && (
                      <>
                        <form onSubmit={handleSubmit}>
                          <Grid2 container spacing={2}>
                            <Grid2 size={6}>
                              <TextField
                                label="Start Date/Time"
                                fullWidth
                                value={
                                  startDttm ? formatDateTime(startDttm) : ""
                                }
                                readOnly
                                margin="dense"
                              />
                            </Grid2>
                            <Grid2 size={6}>
                              <TextField
                                label="End Date/Time"
                                fullWidth
                                value={endDttm ? formatDateTime(endDttm) : ""}
                                readOnly
                                margin="dense"
                              />
                            </Grid2>
                          </Grid2>

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
                              value={newEvent.isSlRecident}
                              onChange={(e) => setNewEvent({ ...newEvent, isSlRecident: e.target.value })}
                            >
                              <MenuItem value={"Yes"}>Yes</MenuItem>
                              <MenuItem value={"No"}>No</MenuItem>
                            </Select>
                          </FormControl>
                          {newEvent.isSlRecident === "No" ? (
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
                                  value={newEvent.isEquipementsRequired}
                                  onChange={(e) => setNewEvent({ ...newEvent, isEquipementsRequired: e.target.value })}
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
                                  value={newEvent.isCochingSessionsRequired}
                                  onChange={(e) => setNewEvent({ ...newEvent, isCochingSessionsRequired: e.target.value })}
                                >
                                  <MenuItem value={"Yes"}>Yes</MenuItem>
                                  <MenuItem value={"No"}>No</MenuItem>
                                </Select>
                              </FormControl>
                            </>
                          ) : (
                            <></>
                          )}
                        </form>
                      </>
                    )}
                    {activeStep == 1 && (
                      <>
                        <form onSubmit={handleSubmit}>
                          <TextField
                            required
                            margin="dense"
                            name="name"
                            label="Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={newEvent.name}
                            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                          />
                          <TextField
                            required
                            margin="dense"
                            name="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="outlined"
                            value={newEvent.email}
                            onChange={(e) => setNewEvent({ ...newEvent, email: e.target.value })}
                          />
                          <TextField
                            required
                            margin="dense"
                            name="phone"
                            label="Contact Number"
                            type="text"
                            fullWidth
                            value={newEvent.phone}
                            variant="outlined"
                            onChange={(e) => setNewEvent({ ...newEvent, phone: e.target.value })}
                          />
                        </form>
                      </>
                    )}
                    {activeStep == 2 &&(
                        <Grid2 container>
                          <Grid2 size={{xs:12,sm:12,md:6,lg:6}} style={{padding:'10px'}}>
                            <Box sx={{width:'100%',borderRadius:'10px',height:'150px',display:'flex',justifyContent:"start",flexDirection:'column'}}>
                            <Typography variant="body1">Name : {newEvent.name}</Typography>
                            <Typography variant="body1">Email : {newEvent.email}</Typography>
                            <Typography variant="body1">Phone : {newEvent.phone}</Typography>
                            </Box>
                          </Grid2>
                          <Grid2 size={{xs:12,sm:12,md:6,lg:6}}>
                          <Box sx={{width:'100%',borderRadius:'10px',height:'150px',display:'flex',justifyContent:"start",alignItems:'center',flexDirection:'column',backgroundColor:'darkgreen',padding:'20px',color:'lightgray'}}>
                            <Typography variant="body1">Start : {startDttm ? formatDateTime(startDttm):""}</Typography>
                            <Typography variant="body1">End : {endDttm ? formatDateTime(endDttm):""}</Typography>
                            <Typography variant="h3" mt={4}>Total : {2500} LKR</Typography>
                            </Box>
                          </Grid2>
                        </Grid2>
                    )}
                  
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color="info"
                      variant="contained"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button
                      onClick={handleNext}
                      sx={{ mr: 1 }}
                      variant="contained"
                      color="info"
                    >
                      Next
                    </Button>
                    {activeStep !== steps.length &&
                      (completed[activeStep] ? (
                        <Typography
                          variant="caption"
                          sx={{ display: "inline-block" }}
                        >
                          Step {activeStep + 1} already completed
                        </Typography>
                      ) : (
                        <Button
                          onClick={completedSteps() === totalSteps() - 1
                            ? handleAddEvent
                            : handleComplete}
                          variant="contained"
                          color="success"
                        >
                          {completedSteps() === totalSteps() - 1
                            ? "Confirm"
                            : "Complete Step"}
                        </Button>
                      ))}
                  </Box>
                </React.Fragment>
              )}
            </div>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddBooking;
