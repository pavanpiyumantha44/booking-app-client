import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard({no,startDttm,endDttm}) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          Schedule # {no}
        </Typography>
        <Typography variant="h5" component="div">
          AAA Company
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Tennis Court {no}</Typography>
        <Typography variant="body2">
          {"2024-10-01 9.00 AM"}
          <br />
          {"2024-10-01 1.00 PM"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Update Schedule</Button>
      </CardActions>
    </Card>
  );
}
