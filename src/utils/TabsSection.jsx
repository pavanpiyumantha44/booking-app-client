import React,{useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid2";
import { Stack } from "@mui/material";
import AddServiceDialog from "../components/Dashboard/AddServiceDialog";
import AddServiceDetailsDialog from "../components/Dashboard/AddServiceDetailsDialog";

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

export default function TabsSection({ id, services, reload, setReload }) {
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
  ];
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Services" {...a11yProps(0)} />
          <Tab label="Service Details" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {/* Header section */}
        <Grid container spacing={2}>
          <Grid size={12}>
            <Stack spacing={2}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 8, md: 10, lg: 10 }}></Grid>
                <Grid
                  size={{ xs: 4, md: 2, lg: 2 }}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <AddServiceDialog
                    id={id}
                    reload={reload}
                    setReload={setReload}
                  />
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
        {/* Body Section */}
        <Grid size={{ xs: 12, md: 12, lg: 12 }} sx={{ marginTop: "1%" }}>
          <Box sx={{ width: "100%" }}>
            <DataGrid
              rows={services}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {/* Header section */}
        <Grid container spacing={2}>
          <Grid size={12}>
            <Stack spacing={2}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 8, md: 10, lg: 10 }}></Grid>
                <Grid
                  size={{ xs: 4, md: 2, lg: 2 }}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <AddServiceDetailsDialog
                    id={id}
                    reload={reload}
                    setReload={setReload}
                    services={services}
                  />
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
        {/* Body Section */}
        <Grid size={{ xs: 12, md: 12, lg: 12 }} sx={{ marginTop: "1%" }}>
          <Box sx={{ width: "100%" }}>
            <DataGrid
              rows={services}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </Grid>
      </CustomTabPanel>
    </Box>
  );
}
