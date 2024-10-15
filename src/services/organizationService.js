import axios from 'axios';

const BASE_URL = "http://localhost:5000";


const getOrganization = async(id)=>{
    try {
        const response = await axios.get(`${BASE_URL}/api/organization/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const getOrganizations = async()=>{
    try {
        const response = await axios.get(`${BASE_URL}/api/organization`,{
            headers:{
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
          });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const addOrganization = async(organization)=>{
    try {
        const response = await axios.post(`${BASE_URL}/api/organization/add`,organization,{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem('token')}`
        }
       })
       return response.data
    } catch (error) {
        console.log(error);
    }
}

const updateOrganization = async(id,organization)=>{
    try {
        const response = await axios.put(`${BASE_URL}/api/organization/${id}`, organization,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const deleteOrganization = async(id)=>{
    try {
        const response = await axios.delete(`${BASE_URL}/api/organization/${id}`,{
            headers:{
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
          });
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export {addOrganization,getOrganization,getOrganizations,updateOrganization,deleteOrganization}