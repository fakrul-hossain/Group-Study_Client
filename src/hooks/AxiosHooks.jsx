import axios from "axios";
import { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";


const AxiosHooks = () => {
    
    
    const {logOut} = useContext(AuthContext)
    const navigate = useNavigate();
    
 
    useEffect(() => {
        axios.interceptors.response.use(
          (result) => {
            return result;
          },
          (error) => {
            console.log(error.message);
    
            if (error.status === 401 || error.status === 403) {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Something Went Wrong",
                showConfirmButton: false,
                timer: 1000,
              });
              logOut();
              navigate("/login");
            }
          }
        );
      }, [navigate, logOut]);
    //   return AxiosSecure;
    };







export default AxiosHooks;