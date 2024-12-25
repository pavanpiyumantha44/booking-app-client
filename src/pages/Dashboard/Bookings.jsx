import { Box, Breadcrumbs, Chip, Stack, Typography } from '@mui/material';
import Grid from "@mui/material/Grid2";
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Progress from '../../components/Progress';
import DataTable from '../../components/DataTable';
import { getAllBookings } from '../../services/bookingService';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import dayjs from 'dayjs';


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
    Bookings
  </Typography>,
];
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const columns2 = [
  {
    field: "client",
    headerName: "Client Name",
    flex: 1,
    editable: false,
    renderCell: (params) => (
      <span style={{ cursor: "pointer" }}>{params.value}</span>
    ),
  },
  {
    field: "description",
    headerName: "Service Type",
    flex: 1,
    editable: false,
  },
  {
    field: "StartDttm",
    headerName: "Start Date Time",
    flex: 1,
    editable: false,
  },
  {
    field: "EndDttm",
    headerName: "End Date Time",
    flex: 1,
    editable: false,
  },
  {
    field: "isCoachingSessionRequired",
    headerName: "Coaching Session",
    flex: 1,
    editable: false,
    renderCell: (params) =>
      params.value === "No"? (
        <ClearIcon color='error'/>
      ) : (
        <DoneIcon color='success'/>
      ),
  },
  {
    field: "isEquipmentRequired",
    headerName: "Tennis Equipment",
    flex: 1,
    editable: false,
    renderCell: (params) =>
      params.value === "No"? (
        <ClearIcon color='error'/>
      ) : (
        <DoneIcon color='success'/>
      ),
  },
  {
    field: "floodLights",
    headerName: "Flood Lights",
    flex: 1,
    editable: false,
    renderCell: (params) =>
      params.value === "No" ? (
        <ClearIcon color='error'/>
      ) : (
        <DoneIcon color='success'/>
      ),
  },
  {
    field: "cost",
    headerName: "Total Cost",
    flex: 1,
    editable: false,
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    editable: false,
    renderCell: (params) =>
      params.value ? (
        <Chip label="Available" color="success" />
      ) : (
        <Chip label="Booked" color="error" />
      ),
  },
];

const Bookings = () => {
  const [reload,setReload] = useState(false);
  const [loading,setLoading] =useState(false);
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const getBookings = async () => {
      try {
        const bookingsResponse = await getAllBookings();
        if (bookingsResponse.success) {
          const data = await bookingsResponse.bookings.map((booking) => ({
            id: booking._id,
            StartDttm: dayjs(booking.startDttm).format('YYYY-MM-DD HH:mm A'),
            EndDttm: dayjs(booking.endDttm).format('YYYY-MM-DD HH:mm A'),
            client : booking.clientId.name,
            //clientEmail : booking.clientId.email,
            //clientPhone : booking.clientId.phone,
            description: booking.serviceId.providedService,
            floodLights: booking.isFloodLightsRequired,
            isCoachingSessionRequired: booking.isCoachingSessionRequired,
            isEquipmentRequired: booking.isTennisEquipmentRequired,
            cost: booking.totalCost+" LKR",
          }));
          setBookings(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getBookings();
  },[reload]);
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={12} sx={{ padding: "20px" }}>
          <Stack spacing={2}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 8, md: 10, lg: 10 }}>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                  {breadcrumbs}
                </Breadcrumbs>
              </Grid>
              <Grid size={{ xs: 4, md: 2, lg: 2 }} sx={{display:'flex', justifyContent:'flex-end'}}>
              {/* <AddServiceDialog id={organizationId.id} reload={reload} setReload={setReload}/> */}
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 12, lg: 12 }} sx={{ marginTop: "2%" }}>
        <Box sx={{ height: '60vh', width: "100%" }}>
        <Typography variant="h5" mb={3} color="primary" sx={{marginLeft:'5px'}}>Bookings</Typography>
          {
            loading ? <Progress/> :
          <>
            <DataTable rows={bookings} cols={columns2}/>
          </>
        }
        </Box>
      </Grid>
    </Box>
  </>
  )
}

export default Bookings