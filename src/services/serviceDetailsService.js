import axios from "axios";

const BASE_URL = 'https://booking-app-backend-xi.vercel.app';

const getServiceDetails = async(id)=>{
    try {
        const response = await axios.get(`${BASE_URL}/api/serviceDetail/services/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
const getAllServiceDetails = async()=>{
    try {
        const response = await axios.get(`${BASE_URL}/api/serviceDetail/services/`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const addServiceDetails = async({providedService,description,isAvailable,orgId,serviceId})=>{
    try {
        const response = await axios.post(`${BASE_URL}/api/serviceDetail/add`,
        {providedService,description,isAvailable,orgId,serviceId},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export {addServiceDetails,getServiceDetails,getAllServiceDetails};