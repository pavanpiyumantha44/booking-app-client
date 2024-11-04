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
import Chip from "@mui/material/Chip";
import { getOrganizations } from "../../services/organizationService";

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
  <Typography key="3" sx={{ color: "text.primary" }}>
    Settings
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

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [alertOn, setAlertOn] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const { id } = useParams();
  const [organization, setOrganization] = useState({});

  useEffect(() => {
    setLoading(true);
    const fetchOrganization = async () => {
      try {
        const organizationResponse = await getOrganizations();
        if (organizationResponse) {
          const data = {
            id: organizationResponse.organizations[0]._id,
            name: organizationResponse.organizations[0].name,
            email: organizationResponse.organizations[0].email,
            phone: organizationResponse.organizations[0].phone,
            address: organizationResponse.organizations[0].address,
            startingTime: organizationResponse.organizations[0].startingTime,
            closingTime: organizationResponse.organizations[0].closingTime,
          };
          setOrganization(data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrganization();
  }, [reload]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrganization({ ...organization, [name]: value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // try {
    //   const response = await updateService(id,organization);
    //   if (response.success) {
    //     setReload(!reload);
    //     setAlertOn(true);
    //     setSnackBarMessage("Updated Sucessfully!!");
    //   }
    // } catch (error) {
    //   if (error.response && !error.response.success) {
    //     console.log(error.response);
    //   }
    // }
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
                    <SaveIcon color="success" />
                  </IconButton>
                  {/* <DeleteDialog id={id} /> */}
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
                        label="Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={organization.name}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid size={12}>
                      <TextField
                        required
                        margin="dense"
                        name="email"
                        label="Email"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={organization.email}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid size={12}>
                      <TextField
                        required
                        margin="dense"
                        name="phone"
                        label="Phone"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={organization.phone}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid container size={12}>
                      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                        <TextField
                          required
                          margin="dense"
                          name="startingTime"
                          label="Starting Time (AM)"
                          type="text"
                          fullWidth
                          variant="outlined"
                          value={organization.startingTime}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                        <TextField
                          required
                          margin="dense"
                          name="closingTime"
                          label="Closing Time (PM)"
                          type="text"
                          fullWidth
                          variant="outlined"
                          value={organization.closingTime}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                    <Grid size={12}>
                      <TextField
                        label="Address"
                        name="description"
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
              <Grid container spacing={2}>
                <Grid size={12}>
                  <Stack spacing={2}>
                    <Grid container spacing={2}>
                      {/* <Grid size={{ xs: 8, md: 10, lg: 10 }}>Service Types</Grid> */}
                      <Grid
                        size={{ xs: 4, md: 2, lg: 2 }}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        {/* <AddServiceDetailsDialog
                    id={id}
                    reload={reload}
                    setReload={setReload}
                    service={service}
                  /> */}
                      </Grid>
                    </Grid>
                  </Stack>
                </Grid>
              </Grid>
              <Grid size={{ xs: 12, md: 12, lg: 12 }} sx={{ marginTop: "1%" }}>
                <Box sx={{ width: "100%" }}>
                  {/* <DataTable rows={serviceDetails} cols={columns2} /> */}
                </Box>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Settings;
