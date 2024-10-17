import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import BasicBars from "./Charts/BasicBars";
import CourtsGuage from "./Charts/CourtsGuage";
import { Typography } from "@mui/material";
import SummaryCard from "../../components/SummaryCard";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DnsIcon from '@mui/icons-material/Dns';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function Summary() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Box sx={{width:'100%',height:'250px',display:'flex',justifyContent:'space-around',alignItems:'center',flexDirection:{xs:'column',sm:'column',md:'row',lg:'row'}}} my={5}>
            <SummaryCard title={"No Of Services"} value={5}/>
            <SummaryCard title={"Total Earnings"} value={"65000 RS"}/>
            <SummaryCard title={"No Of Services"} value={5}/>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 8, lg: 8 }}>
          <Item sx={{ height: "450px" }}>
            <BasicBars />
          </Item>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }}>
          <Item
            sx={{
              height: "450px",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: {
                xs: "column",
                sm: "column",
                md: "row",
                lg: "row",
              },
              alignItems: "center",
            }}
          >
            <CourtsGuage value={2} valueMax={4} />
            <CourtsGuage value={1} valueMax={2} />
            <CourtsGuage value={4} valueMax={5} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
