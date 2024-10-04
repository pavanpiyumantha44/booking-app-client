import axios from "axios";

const BASE_URL = 'http://localhost:5000';

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

export {addServiceDetails,getServiceDetails};