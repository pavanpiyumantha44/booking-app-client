import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_API_URL;

const getServices = async(id)=>{
    try {
        const response = await axios.get(`${BASE_URL}/api/service/org/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
const getService = async(id)=>{
    try {
        const response = await axios.get(`${BASE_URL}/api/service/${id}`,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          return response.data;
    } catch (error) {
        console.log(error);
    }
}
const getAllServices = async()=>{
    try {
        const response = await axios.get(`${BASE_URL}/api/service/`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const addService = async({name,description,id})=>{
    try {
        const response = await axios.post(`${BASE_URL}/api/service/add`,{name,description,id},{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem('token')}`
        }
       });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const updateService = async(id,service)=>{
    try {
        const response = await axios.put(`${BASE_URL}/api/service/${id}`, service,
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
const deleteService = async(id)=>{
    try {
        const response = await axios.delete(`${BASE_URL}/api/service/${id}`,{
            headers:{
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
          });
        return response.data
    } catch (error) {
        console.log(error);
    }
}
export {addService,getService,getAllServices,getServices,updateService,deleteService}