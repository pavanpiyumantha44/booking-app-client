import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Box, Grid2 } from "@mui/material";
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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import BigCalendar from "../components/BigCalendar";

const steps = ["User Info", "List of Services", "Complete Booking"];
const Booking = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [startValue, setStartValue] = React.useState(dayjs("2024-10-06T15:30"));
  const [endValue, setEndValue] = React.useState(dayjs("2024-10-06T16:00"));

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

  const handleChange = () => {};
  const handleSubmit = () => {};
  const [sl, setSl] = useState("");
  return (
    <>
      <NavBar />
      <Box
        sx={{
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          padding: "50px",
        }}
      >
        <Box sx={{}}>
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
                  Step {activeStep + 1}
                  {activeStep == 0 && (
                    <>
                      <form onSubmit={handleSubmit}>
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
                          >
                            <MenuItem value={"Yes"}>Yes</MenuItem>
                            <MenuItem value={"No"}>No</MenuItem>
                          </Select>
                        </FormControl>
                        <TextField
                          required
                          margin="dense"
                          name="name"
                          label="Name"
                          type="text"
                          fullWidth
                          variant="outlined"
                          onChange={handleChange}
                        />
                        <TextField
                          required
                          margin="dense"
                          name="email"
                          label="Email Address"
                          type="email"
                          fullWidth
                          variant="outlined"
                          onChange={handleChange}
                        />
                        <TextField
                          required
                          margin="dense"
                          name="phone"
                          label="Contact Number"
                          type="text"
                          fullWidth
                          variant="outlined"
                          onChange={handleChange}
                        />
                      </form>
                    </>
                  )}
                  {activeStep == 1 && (
                    <>
                      <form onSubmit={handleSubmit}>
                        <Grid2 container spacing={2}>
                        <Grid2 size={{sm:12,md:6,lg:6}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DateTimePicker"]}>
                            <DateTimePicker
                              label="Start Date Time"
                              value={startValue}
                              onChange={(newValue) => setStartValue(newValue)}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                        </Grid2>
                        <Grid2 size={{sm:12,md:6,lg:6}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DateTimePicker"]}>
                            <DateTimePicker
                              label="End Date Time"
                              value={endValue}
                              onChange={(newValue) => setEndValue(newValue)}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
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
                          >
                            <MenuItem value={"Yes"}>Yes</MenuItem>
                            <MenuItem value={"No"}>No</MenuItem>
                          </Select>
                        </FormControl>
                        <TextField
                          required
                          margin="dense"
                          name="name"
                          label="Name"
                          type="text"
                          fullWidth
                          variant="outlined"
                          onChange={handleChange}
                        />
                        <TextField
                          required
                          margin="dense"
                          name="email"
                          label="Email Address"
                          type="email"
                          fullWidth
                          variant="outlined"
                          onChange={handleChange}
                        />
                        <TextField
                          required
                          margin="dense"
                          name="phone"
                          label="Contact Number"
                          type="text"
                          fullWidth
                          variant="outlined"
                          onChange={handleChange}
                        />
                      </form>
                    </>
                  )}
                  {activeStep == 2 && (
                    <BigCalendar/>
                  )}
                </Typography>
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
                        onClick={handleComplete}
                        variant="contained"
                        color="success"
                      >
                        {completedSteps() === totalSteps() - 1
                          ? "Finish"
                          : "Complete Step"}
                      </Button>
                    ))}
                </Box>
              </React.Fragment>
            )}
          </div>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Booking;
