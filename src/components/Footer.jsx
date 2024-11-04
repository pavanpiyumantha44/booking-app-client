import React from 'react'
import { Box, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Box 
        component="footer" 
        sx={{ 
          backgroundColor: 'black', 
          color: 'white', 
          textAlign: 'center',
          height:'50px',  
          padding: '10px' 
        }}
      >
        <Typography variant="body2" sx={{marginTop:'10px'}}>
          © 2024 Kandy Garden Club. All rights reserved.
        </Typography>
      </Box>
  )
}

export default Footer