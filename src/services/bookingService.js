import axios from 'axios';


const BASE_URL = process.env.REACT_APP_SERVER_API_URL;

const addBooking = async(newBooking)=>{
    try {
        const response = await axios.post(`${BASE_URL}/api/booking/add`,newBooking,{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem('token')}`
        }
       })
       return response.data
    } catch (error) {
        console.log(error);
    }
}
const getAllBookings = async()=>{
    try {
        const response = await axios.get(`${BASE_URL}/api/booking/`)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export {addBooking,getAllBookings}


