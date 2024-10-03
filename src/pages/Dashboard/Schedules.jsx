import { Box, Breadcrumbs, Stack, Typography } from "@mui/material";
import React from "react";
import BasicCard from "../../components/Card";
import Grid from "@mui/material/Grid2";
import { NavLink } from "react-router-dom";

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
    Schedules
  </Typography>,
];
const initialEvents = [
  {
    id: "1",
    calendarId: "cal1",
    title: "Lunch",
    category: "time",
    start: "2024-09-25T12:00:00",
    end: "2024-09-25T13:30:00",
  },
  {
    id: "2",
    calendarId: "cal1",
    title: "Coffee Break",
    category: "time",
    start: "2024-09-28T15:00:00",
    end: "2024-09-28T15:30:00",
  },
];
const Schedules = () => {
  return (
    <>
      <Box
        sx={{
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          padding: "50px",
        }}
      >
        <Grid container spacing={2}>
          <Grid size={12} sx={{ padding: "20px" }}>
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
                ></Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {initialEvents.map((key, val) => (
            <Grid size={{ sm: 12, md: 4, lg: 4 }} key={key}>
              <BasicCard no={1} startDttm={val.start} endDttm={val.end} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Schedules;
