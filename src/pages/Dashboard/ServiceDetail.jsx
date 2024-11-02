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
import RefreshIcon from "@mui/icons-material/Refresh";
import SnackBar from "../../components/SnackBar";
import { getService, updateService } from "../../services/provideService";
import { getServiceDetails } from "../../services/serviceDetailsService";
import Chip from "@mui/material/Chip";
import DataTable from "../../components/DataTable";
import AddServiceDetailsDialog from "./Dialogs/AddServiceDetailsDialog";

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
    to="/dashboard/services"
    style={{ textDecoration: "none", color: "GrayText" }}
  >
    Services
  </NavLink>,
  <Typography key="3" sx={{ color: "text.primary" }}>
    Service Details
  </Typography>,
];
const columns2 = [
  {
    field: "providedService",
    headerName: "Provided Service",
    flex: 1,
    editable: false,
    renderCell: (params) => (
      <span style={{ cursor: "pointer" }}>{params.value}</span>
    ),
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
    editable: false,
  },
  {
    field: "localCost",
    headerName: "Local Cost (1H)",
    flex: 1,
    editable: false,
  },
  {
    field: "foreignCost",
    headerName: "Foreign Cost (1H)",
    flex: 1,
    editable: false,
  },
  {
    field: "isAvailable",
    headerName: "Availability",
    flex: 1,
    editable: false,
    renderCell: (params) =>
      params.value ? (
        <Chip label="Available" color="success" />
      ) : (
        <Chip label="Unavailable" color="error" />
      ),
  },
];

const ServiceDetail = () => {
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [alertOn, setAlertOn] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const { id } = useParams();
  const [service, setService] = useState({});
  const [serviceDetails, setServiceDetails] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchService = async () => {
      try {
        const serviceResponse = await getService(id); // Corrected variable name
        if (serviceResponse) {
          const data = {
            id: serviceResponse.service._id,
            name: serviceResponse.service.name,
            description: serviceResponse.service.description,
          };
          setService(data); // Set the state with the new data
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchServiceDetails = async () => {
      try {
        const serviceDetailResponse = await getServiceDetails(id);
        if (serviceDetailResponse.success) {
          const data = await serviceDetailResponse.serviceDetails.map(
            (detail) => ({
              id: detail._id,
              providedService: detail.providedService,
              description: detail.description,
              localCost: detail.localCost+" LKR",
              foreignCost: detail.foreignCost+" LKR",
              isAvailable: detail.isAvailable,
            })
          );
          setServiceDetails(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchService();
    fetchServiceDetails();
  }, [reload]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await updateService(id,service);
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
  const refresh = () => {
    setReload(!reload);
  };
  const handleClose = () => {
    setAlertOn(false); // Close the Snackbar
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <SnackBar
            open={alertOn}
            message={snackBarMessage}
            onClose={handleClose}
          />
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
                    <SaveIcon color="success"/>
                  </IconButton>
                  <DeleteDialog id={id}/>
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
                    <Grid size={12}>
                      <TextField
                        required
                        margin="dense"
                        name="name"
                        label="Service Name"
                        type="text"
                        fullWidth                        
                        variant="outlined"
                        value={service.name}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid size={12}>
                      <TextField
                        label="Service Description"
                        name="description"
                        margin="dense"
                        fullWidth
                        multiline
                        rows={3}
                        required
                        type="text"
                        variant="outlined"
                        value={service.description}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </form>
              </Box>
              <Grid container spacing={2}>
          <Grid size={12}>
            <Stack spacing={2}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 8, md: 10, lg: 10 }}>Service Types</Grid>
                <Grid
                  size={{ xs: 4, md: 2, lg: 2 }}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <AddServiceDetailsDialog
                    id={id}
                    reload={reload}
                    setReload={setReload}
                    service={service}
                  />
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
              <Grid size={{ xs: 12, md: 12, lg: 12 }} sx={{ marginTop: "1%" }}>
                <Box sx={{ width: "100%" }}>
                  <DataTable rows={serviceDetails} cols={columns2} />
                </Box>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default ServiceDetail;
