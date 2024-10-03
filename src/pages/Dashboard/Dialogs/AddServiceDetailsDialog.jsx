import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function AddServiceDetailsDialog({ id, reload, setReload, services }) {
  const [open, setOpen] = useState(false);
  const [serviceId,setServiceId] = useState();
  const [providedService,setProvidedService] = useState();
  const [description,setDescription] = useState();
  const [isAvailable,setIsAvailable] = useState(true);
  const [orgId,setOrgId] = useState(id);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/serviceDetail/add",
        {providedService,description,isAvailable,orgId,serviceId},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setReload(!reload);
        handleClose();

      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.log(error.response);
      }
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen}>
        <AddIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Service Details</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Service</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={serviceId}
                onChange={(e)=>{setServiceId(e.target.value)}}
              >
                {
                    services.map((value,key)=>(
                        <MenuItem value={value.id} key={key}>{value.name}</MenuItem>
                    ))
                }
              </Select>
            </FormControl>
            <TextField
              required
              margin="dense"
              name="providedSrvice"
              label="Provided Service"
              type="text"
              fullWidth
              variant="outlined"
              onChange={(e)=>{setProvidedService(e.target.value)}}
            />
            <TextField
              label="Description"
              name="description"
              margin="dense"
              fullWidth
              multiline
              rows={3}
              required
              type="text"
              variant="outlined"
              onChange={(e)=>{setDescription(e.target.value)}}
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary" variant="contained">
                Create
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
