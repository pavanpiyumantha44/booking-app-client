import axios from 'axios';
import { createContext, useContext, useEffect} from 'react'
import {useState } from 'react';


const userContext = createContext();

const AuthContext = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        const verifyUser = async()=>{
            try {
                const token = localStorage.getItem("token");
                if(token){
                    const response = await axios.get('http://localhost:5000/api/auth/verify',{
                        headers:{
                            "Authorization":`Bearer ${token}`
                        }
                    });
                    if(response.data.success){
                        setUser(response.data.user)
                    }
                }else{
                   setUser(null)
                   setLoading(false);
                }

            } catch (error) {
                if(error.response && !error.response.data.success){
                    setUser(null)
                }
                
            }finally{
                setLoading(false);
            }
        }
        verifyUser()
    },[])

    const login = (user)=>{
        setUser(user);
    }
    const logout = ()=>{
        localStorage.removeItem("token");
        setUser(null);
    }
  return (
    <userContext.Provider value={{user,login,logout,loading}}>
        {children}
    </userContext.Provider>
  )
}
export const useAuth = ()=> useContext(userContext);
export default AuthContext