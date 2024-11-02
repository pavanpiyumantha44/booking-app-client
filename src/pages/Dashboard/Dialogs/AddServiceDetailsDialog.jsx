import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { addServiceDetails } from "../../../services/serviceDetailsService";

export default function AddServiceDetailsDialog({ id, reload, setReload,service}) {
  const [open, setOpen] = useState(false);
  const [serviceId,setServiceId] = useState(service.id);
  const [providedService,setProvidedService] = useState();
  const [description,setDescription] = useState();
  const [localCost,setLocalCost] = useState();
  const [foreignCost,setForeignCost] = useState();
  const [isAvailable,setIsAvailable] = useState(true);
  const [orgId,setOrgId] = useState(id);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addServiceDetails({providedService,description,localCost,foreignCost,isAvailable,serviceId});
      if (response.success) {
        setReload(!reload);
        handleClose();
      }
    } catch (error) {
      if (error.response && !error.response.success) {
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
            <TextField
              required
              margin="dense"
              name="service"
              label="service"
              type="text"
              fullWidth
              variant="outlined"
              disabled
              value={service.name}
              onChange={(e)=>{setServiceId(service.id)}}
            />
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
             <TextField
              required
              margin="dense"
              name="localCost"
              label="Cost for 1H (Local) LKR"
              type="number"
              min={0}
              fullWidth
              inputProps={{
                min: 1,  // Set minimum value
              }}
              variant="outlined"
              onChange={(e)=>{setLocalCost(e.target.value)}}
            />
             <TextField
              required
              margin="dense"
              name="foreignCost"
              label="Cost for 1H (Foreigners) LKR"
              type="number"
              min={0}
              fullWidth
              inputProps={{
                min: 1,  // Set minimum value
              }}
              variant="outlined"
              onChange={(e)=>{setForeignCost(e.target.value)}}
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
