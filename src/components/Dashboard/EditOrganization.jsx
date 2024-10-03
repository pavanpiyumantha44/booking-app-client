import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Progress from "../../utils/Progress";
import { NavLink, useParams } from "react-router-dom";
import Tab from "@mui/material/Tab";
import { IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import DeleteDialog from "./DeleteDialog";
import TabsSection from "../../utils/TabsSection";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

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
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const [organization, setOrganization] = useState([]);
  const [services, setServices] = useState(null);

  useEffect(() => {
    const fetchOrganization = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/organization/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setOrganization(response.data.organization);
          setReload(true);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/service/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          const data = await response.data.services.map((service) => ({
            id: service._id,
            name: service.name,
            cost: service.cost,
            description: service.description,
          }));
          console.log(response.data.services);
          setServices(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchServices();
    fetchOrganization();
  }, [reload]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrganization({ ...organization, [name]: value });
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/organization/${id}`,
        organization,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setReload(true);
        setLoading(false);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.log(error.response);
      }
    }
  };

  //Tab section
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      editable: true,
      renderCell: (params) => (
        <span
          style={{ cursor: "pointer" }}
          //onClick={() => handleEditClick(params.id)}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      editable: true,
    },
    {
      field: "cost",
      headerName: "Cost (1H)",
      flex: 1,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      editable: false,
      renderCell: (params) => {
        return (
          <>
            <GridActionsCellItem
              //icon={<EditIcon />}
              label="Edit"
              //onClick={() => handleEditClick(params.id)}
              color="inherit"
            />
            <GridActionsCellItem
              //icon={<DeleteIcon />}
              label="Delete"
              //onClick={() => handleDeleteClick(params.id)}
              color="inherit"
            />
          </>
        );
      },
    },
  ];
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
                        focused
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
                        focused
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
                        focused
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
                        focused
                        value={organization.address}
                        onChange={handleTabChange}
                      />
                    </Grid>
                  </Grid>
                </form>
              </Box>
              <TabsSection/>
            </>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default EditOrganization;
