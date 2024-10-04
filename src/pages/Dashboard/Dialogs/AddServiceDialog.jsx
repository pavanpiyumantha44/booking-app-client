import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { addService } from "../../../services/provideService";

export default function AddServiceDialog({id,reload,setReload}) {
  const [open, setOpen] = React.useState(false);
  const [service, setService] = useState({
    name: "",
    description: "",
    cost: "",
    orgId:id
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const response = await addService(service);
       if(response.success){
          setReload(!reload);
          handleClose();
       }
    } catch (error) {
      if(error.response && !error.response.success){
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
        <DialogTitle>New Service</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
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
              name="cost"
              label="Cost for (1H)"
              type="number"
              min={0}
              fullWidth
              variant="outlined"
              onChange={handleChange}
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
              onChange={handleChange}
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
