import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_API_URL;

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

const addServiceDetails = async({providedService,description,localCost,foreignCost,isAvailable,serviceId})=>{
    try {
        const response = await axios.post(`${BASE_URL}/api/serviceDetail/add`,
        {providedService,description,localCost,foreignCost,isAvailable,serviceId},
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