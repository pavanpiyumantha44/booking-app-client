import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { addOrganization } from "../../../services/organizationService";

export default function FormDialog({reload,setReload}) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [organization, setOrganization] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrganization({ ...organization, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const response = await addOrganization(organization);
       if(response.success){
          setReload(!reload);
          handleClose();
          navigate('/dashboard/organizations');
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
        <DialogTitle>New Service Provider</DialogTitle>
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
            <TextField
              label="Address"
              name="address"
              margin="dense"
              fullWidth
              multiline
              rows={4}
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
