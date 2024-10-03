import React, { useEffect, useState } from 'react'
import Box from "@mui/material/Box";
import {GridActionsCellItem } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import Progress from '../../components/Progress';
import DataTable from '../../components/DataTable';
import FormDialog from './Dialogs/FormDialog';

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

  
  const rows = [
    {
      id: 1,
      name: "Tech Innovators Inc.",
      address: "123 Main St, Springfield, IL",
      email: "contact@techinnovators.com",
      phone: "123-456-7890",
    },
    {
      id: 2,
      name: "Smith Solutions",
      address: "456 Elm St, Lincoln, NE",
      email: "info@smithsolutions.com",
      phone: "234-567-8901",
    },
    {
      id: 3,
      name: "Johnson & Co.",
      address: "789 Oak St, Denver, CO",
      email: "support@johnsonco.com",
      phone: "345-678-9012",
    },
    {
      id: 4,
      name: "Davis Enterprises",
      address: "321 Maple St, Portland, OR",
      email: "sales@davisenterprises.com",
      phone: "456-789-0123",
    },
    {
      id: 5,
      name: "Martinez Global",
      address: "654 Pine St, Austin, TX",
      email: "admin@martinezglobal.com",
      phone: "567-890-1234",
    },
    {
      id: 6,
      name: "Wilson Tech Solutions",
      address: "987 Cedar St, Seattle, WA",
      email: "wilson@techsolutions.com",
      phone: "678-901-2345",
    },
    {
      id: 7,
      name: "Green Valley Corp.",
      address: "123 Birch St, San Francisco, CA",
      email: "hello@greenvalley.com",
      phone: "789-012-3456",
    },
    {
      id: 8,
      name: "NextGen Innovations",
      address: "456 Aspen St, New York, NY",
      email: "info@nextgen.com",
      phone: "890-123-4567",
    },
    {
      id: 9,
      name: "Bright Horizons",
      address: "789 Redwood St, Miami, FL",
      email: "contact@brighthorizons.com",
      phone: "901-234-5678",
    },
    {
      id: 10,
      name: "Blue Ocean Ventures",
      address: "321 Cypress St, Los Angeles, CA",
      email: "support@blueocean.com",
      phone: "012-345-6789",
    },
    {
      id: 11,
      name: "Skyline Innovations",
      address: "654 Willow St, Boston, MA",
      email: "sales@skylineinnovations.com",
      phone: "123-456-7891",
    },
    {
      id: 12,
      name: "Peak Performance LLC",
      address: "987 Aspen St, Phoenix, AZ",
      email: "info@peakperformance.com",
      phone: "234-567-8902",
    },
    {
      id: 13,
      name: "Quantum Dynamics",
      address: "123 Fir St, Chicago, IL",
      email: "contact@quantumdynamics.com",
      phone: "345-678-9013",
    },
    {
      id: 14,
      name: "FusionTech Solutions",
      address: "456 Spruce St, Dallas, TX",
      email: "admin@fusiontech.com",
      phone: "456-789-0124",
    },
    {
      id: 15,
      name: "Vortex Global",
      address: "789 Hickory St, San Diego, CA",
      email: "hello@vortexglobal.com",
      phone: "567-890-1235",
    },
  ];
  
  
  
  const breadcrumbs = [
    <NavLink underline="hover" key="1" color="inherit" to="/dashboard/" style={{textDecoration:'none',color:'GrayText'}}>
      Dashboard
    </NavLink>,
    <Typography key="3" sx={{ color: "text.primary" }}>
      Service Provider
    </Typography>,
  ];
const Organizations = () => {
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex:1,
      editable: true,
      renderCell: (params) => (
        <span
          style={{ cursor: 'pointer'}}
          onClick={() => handleEditClick(params.id)}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "address",
      headerName: "Address",
      flex:1,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      flex:1,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex:1,
      editable: true,
    },
    {
        field: "action",
        headerName: "Action",
        flex:1,
        editable: false,
        renderCell: (params) => {
          return (
            <>
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                onClick={() => handleEditClick(params.id)}
                color="inherit"
              />
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() => handleDeleteClick(params.id)}
                color="inherit"
              />
            </>
          );
        }
      },
  ];
  const [organizations,setOrganizations] = useState(null);
  const [reload,setReload] = useState(false);
  const [loading,setLoading] =useState(false);
  const [openDeleteDialog,setOpenDeleteDialog] = useState(false);
  const navigate = useNavigate();
  
  
  useEffect(()=>{
    const fetchOrganizations = async()=>{
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/organization',{
          headers:{
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          const data = await response.data.organizations.map((org)=>(
            {
              id: org._id,
              name: org.name,
              email: org.email,
              phone: org.phone,
              address: org.address
            }
          ));
          setOrganizations(data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error.response.error);
      }
    }
    fetchOrganizations();
  },[reload])
    
    const handleEditClick = (id)=>{
      navigate(`/dashboard/organizations/${id}`);
    }
    const handleDeleteClick = async(id)=>{
      try {
        setLoading(true);
        const response = await axios.delete(`http://localhost:5000/api/organization/${id}`,{
          headers:{
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          setReload(!reload);
          setLoading(false);
        }
      } catch (error) {
        console.log(error.response.error);
      }
    }

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
              <FormDialog reload={reload} setReload={setReload}/>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 12, lg: 12 }} sx={{ marginTop: "2%" }}>
        <Box sx={{ height: '60vh', width: "100%" }}>
          {
            loading ? <Progress/> :
          <DataTable rows={organizations} cols={columns}/>
        }
        </Box>
      </Grid>
    </Box>
  </>
  )
}

export default Organizations