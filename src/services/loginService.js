import axios from "axios";

const BASE_URL = 'http://localhost:5000';

const loginService = async({email,password})=>{
    try {
        const response = await axios.post(`${BASE_URL}/api/auth/login`,{email,password});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export default loginService;