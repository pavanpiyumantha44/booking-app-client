import axios from 'axios';


const BASE_URL = process.env.REACT_APP_SERVER_API_URL;

const addClient = async(client)=>{
    try {
        const response = await axios.post(`${BASE_URL}/api/client/add`,client,{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem('token')}`
        }
       })
       return response.data
    } catch (error) {
        console.log(error);
    }
}

export {addClient}