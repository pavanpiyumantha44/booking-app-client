import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DeleteDialog({id}) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async(id)=>{
    try {
      const response = await axios.delete(`http://localhost:5000/api/organization/${id}`,{
        headers:{
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success){
        handleClose();
        navigate('/dashboard/organizations');
      }
    } catch (error) {
      console.log(error.response.error);
    }
  }
  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Service Provider"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this service provider?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>handleDelete(id)} autoFocus color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
