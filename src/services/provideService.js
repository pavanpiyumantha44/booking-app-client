import axios from "axios";

const BASE_URL = 'https://booking-app-backend-xi.vercel.app'

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
const getAllServices = async()=>{
    try {
        const response = await axios.get(`${BASE_URL}/api/service/`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const addService = async(service)=>{
    try {
        const response = await axios.post(`${BASE_URL}/api/service/add`,service,{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem('token')}`
        }
       });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export {addService,getAllServices,getServices}