import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Progress() {
  return (
    <Box sx={{ display: 'flex', width:'fullWidth', justifyContent:'center', alignItems:'center', height:'50vh'}}>
      <CircularProgress />
    </Box>
  );
}