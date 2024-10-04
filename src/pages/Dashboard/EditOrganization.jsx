import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Progress from "../../components/Progress";
import { NavLink, useParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import DeleteDialog from "./Dialogs/DeleteDialog";
import TabsSection from "../../components/TabsSection";
import RefreshIcon from '@mui/icons-material/Refresh';
import SnackBar from "../../components/SnackBar";
import { getOrganization, updateOrganization } from "../../services/organizationService";
import { getServices } from "../../services/provideService";
import { getServiceDetails } from "../../services/serviceDetailsService";

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
  const [reload, setReload] = useState(false);
  const [alertOn,setAlertOn] = useState(false);
  const [snackBarMessage,setSnackBarMessage] = useState('');
  const { id } = useParams();
  const [organization, setOrganization] = useState([]);
  const [services, setServices] = useState(null);
  const [serviceDetails, setServiceDetails] = useState(null);

  useEffect(() => {
    const fetchOrganization = async () => {
      setLoading(true);
      try {
        const orgResponse = await getOrganization(id);
        if (orgResponse.success) {
          setOrganization(orgResponse.organization);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchServices = async () => {
      try {
        const servicesResponse = await getServices(id);
        if (servicesResponse.success) {
          const data = await servicesResponse.services.map((service) => ({
            id: service._id,
            name: service.name,
            cost: service.cost,
            description: service.description,
          }));
          setServices(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    
    const fetchServiceDetails = async () => {
      try {
        const serviceDetailResponse = await getServiceDetails(id);
        if (serviceDetailResponse.success) {
          const data = await serviceDetailResponse.serviceDetails.map((detail) => ({
            id: detail._id,
            service:detail.serviceId.name,
            providedService: detail.providedService,
            description: detail.description,
            isAvailable:detail.isAvailable,
          }));
          setServiceDetails(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchServiceDetails();
    fetchServices();
    fetchOrganization();
  }, [reload]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrganization({ ...organization, [name]: value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await updateOrganization(id,organization);
      if (response.success) {
        setReload(!reload);
        setAlertOn(true);
        setSnackBarMessage("Updated Sucessfully!!");
      }
    } catch (error) {
      if (error.response && !error.response.success) {
        console.log(error.response);
      }
    }
  };
  const refresh = ()=>{
    setReload(!reload);
  }
  const handleClose = () => {
    setAlertOn(false); // Close the Snackbar
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <SnackBar open={alertOn} message={snackBarMessage} onClose={handleClose}/>
          {/* Header Tools */}
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
                  <IconButton onClick={refresh} color="info">
                    <RefreshIcon />
                  </IconButton>
                  <IconButton onClick={handleSubmit} type="submit">
                    <SaveIcon />
                  </IconButton>
                  <DeleteDialog id={id} />
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
              <Box sx={{ height: "30vh", width: "100%", marginBottom: "1%" }}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid size={{ sm: 12, md: 4, lg: 4 }}>
                      <TextField
                        required
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={organization.name}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid size={{ sm: 12, md: 4, lg: 4 }}>
                      <TextField
                        required
                        margin="dense"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={organization.email}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid size={{ sm: 12, md: 4, lg: 4 }}>
                      <TextField
                        required
                        margin="dense"
                        name="phone"
                        label="Contact Number"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={organization.phone}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid size={12}>
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
                        value={organization.address}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </form>
              </Box>
              <TabsSection id={id} services={services} serviceDetails={serviceDetails} reload={reload} setReload={setReload}/>
            </>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default EditOrganization;
