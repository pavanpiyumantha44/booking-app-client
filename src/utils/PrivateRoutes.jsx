import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Progress from "./Progress";



const PrivateRoutes = ({children}) => {
  const {user,loading} = useAuth();

  if(loading){
    return <><div style={{display:'flex', alignItems:'center',justifyContent:'center', height:'90vh'}}><Progress/></div></>
  }
  return user ? children : <Navigate to='/login' />
}

export default PrivateRoutes