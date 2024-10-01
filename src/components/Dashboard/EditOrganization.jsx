import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Progress from "../../utils/Progress";
import { NavLink, useParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";

const breadcrumbs = [
  <NavLink
    underline="hover"
    key="1"
    color="inherit"
    to="/dashboard/"
    style={{ textDecoration: "none", color: "GrayText" }}
  >
    Dashboard
  </NavLink>,
  <NavLink
    underline="hover"
    key="1"
    color="inherit"
    to="/dashboard/organizations"
    style={{ textDecoration: "none", color: "GrayText" }}
  >
    Service Provider
  </NavLink>,
  <Typography key="3" sx={{ color: "text.primary" }}>
    Edit Service Provider
  </Typography>,
];
const EditOrganization = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const [organization,setOrganization] = useState({});

  useEffect(()=>{
    const fetchOrganization = async()=>{
    try {
      const response = await axios.get(`http://localhost:5000/api/organization/${id}`,{
        headers:{
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success){
        setOrganization(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  fetchOrganization();
  console.log(organization)
  },[id])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 12, lg: 12 }} sx={{ padding: "20px" }}>
            <Stack spacing={2}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 8, md: 10, lg: 10 }}>
                  <Breadcrumbs separator="›" aria-label="breadcrumb">
                    {breadcrumbs}
                  </Breadcrumbs>
                </Grid>
                <Grid
                  size={{ xs: 4, md: 2, lg: 2 }}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <IconButton>
                    <SaveIcon />
                  </IconButton>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, md: 12, lg: 12 }} sx={{ marginBottom: "10px" }}>
          {loading ? (
            <Progress />
          ) : (
            <>
              <Box sx={{ height: "30vh", width: "100%", marginBottom: "8%" }}>
                <Grid size={12} sx={{ padding: "10px" }}>
                  <Grid item size={12}>
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
                  </Grid>
                  <Grid item size={12}>
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
                  </Grid>
                  <Grid item size={12}>
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
                  </Grid>
                  <Grid item size={12}>
                    <TextField
                      label="Address"
                      name="address"
                      margin="dense"
                      fullWidth
                      multiline
                      rows={3}
                      required
                      type="text"
                      variant="outlined"
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ width: "100%", marginTop: "100px" }}>
                <Tabs
                  onChange={handleChange}
                  value={value}
                  aria-label="Tabs where selection follows focus"
                  selectionFollowsFocus
                >
                  <Tab label="Services"></Tab>
                  <Tab label="Service Details">Service Details</Tab>
                </Tabs>
              </Box>
            </>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default EditOrganization;
