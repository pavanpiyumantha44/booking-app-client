import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 120,
  lineHeight: "60px",
}));
const SummaryCard = ({title,value}) => {
  return (
    <>
      <Item elevation={1} sx={{ width: "400px",marginTop:'10px',marginBottom:'10px'}}>
       <Box>
        <Typography variant="h5" sx={{my:2}}>{title}</Typography>
        <Typography variant="h4">{value}</Typography>
       </Box>
      </Item>
    </>
  );
};

export default SummaryCard;
