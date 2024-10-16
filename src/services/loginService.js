import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_API_URL;

const loginService = async({email,password})=>{
    try {
        console.log(BASE_URL);
        const response = await axios.post(`${BASE_URL}/api/auth/login`,{email,password});
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data.error : new Error("Server Error");
    }
}

export default loginService;