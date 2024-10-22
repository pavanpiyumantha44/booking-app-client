import React, { useEffect, useState } from 'react'
import Box from "@mui/material/Box";
import {GridActionsCellItem } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { NavLink, useNavigate } from "react-router-dom";
import Progress from '../../components/Progress';
import DataTable from '../../components/DataTable';
import FormDialog from './Dialogs/FormDialog';
import { deleteOrganization, getOrganizations } from '../../services/organizationService';


  
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
      editable: false,
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
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
      flex:1,
      editable: false,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex:1,
      editable: false,
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
  const navigate = useNavigate();
  
  
  useEffect(()=>{
    const fetchOrganizations = async()=>{
      try {
        setLoading(true);
        const response = await getOrganizations();
        if(response.success){
          const data = await response.organizations.map((org)=>(
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
        const response = await deleteOrganization(id);
        if(response.success){
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