import React, { useState } from "react";
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
} from "@mui/material";

const CreateBooking = ({ openAddDialog, setOpenAddDialog }) => {
  
  const [step,setStep] = useState(1);
  const [isSlResident, setIsSlResident] = useState("");
  const [errorMsg,setErrorMsg] = useState("");
  const [isEquipmentsRequired, setIsEquipmentsRequired] = useState("");
  const [isCoachingSessionsRequired, setIsCoachingSessionsRequired] =
    useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const increaseSteps = ()=>{
    if(step===1){
      setErrorMsg("");
      setStep(step+1);
    }
    if(step===2){
      setErrorMsg("");
      if(name===""||email===""||phone===""){
        setErrorMsg("Please Fill All the fields")
      }
      else{
        setStep(step+1);
      }
    }
  }
  const decreaseSteps = ()=>{
    setErrorMsg("");
    setStep(step-1);
  }
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
          {errorMsg&& <Box sx={{color:'tomato'}}>{errorMsg}</Box>}
          <Box>
            {
              step===1 ?
              <>
              <Grid2 container size={12} spacing={2}>
                <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <TextField
                    label="Start Date/Time"
                    fullWidth
                    //value={startDttm ? formatDateTime(startDttm) : ""}
                    readOnly
                    margin="dense"
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                  <TextField
                    label="Start Date/Time"
                    fullWidth
                    //value={startDttm ? formatDateTime(startDttm) : ""}
                    readOnly
                    margin="dense"
                  />
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
                          //value={newEvent.isEquipementsRequired}
                          //onChange={(e) => setNewEvent({ ...newEvent, isEquipementsRequired: e.target.value })}
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
                          //value={newEvent.isCochingSessionsRequired}
                          //onChange={(e) => setNewEvent({ ...newEvent, isCochingSessionsRequired: e.target.value })}
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
              </>:<></>
            }
            {
              step===2 ?
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
              </>:<></>
            }
          </Box>
        </DialogContent>
        <DialogActions>
            <Grid2 container size={12} p={2}>
                <Grid2 size={6}>
                  <Button variant={step===1?"outlined":"contained"} disabled={step===1?true:false} onClick={decreaseSteps}>Back</Button>
                </Grid2>
                <Grid2 size={6}>
                  <Button variant="contained" onClick={increaseSteps}>Next</Button>
                </Grid2>
            </Grid2>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateBooking;
