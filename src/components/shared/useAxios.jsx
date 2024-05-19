import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// export const baseUrl = ;
export const baseUrl = "http://localhost:5000";

export const axiosPublic = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

const axiosSecure = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

const useAxios = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          logOut()
            .then(() => {
              navigate("/login");
            })
            .catch((error) => {
              console.log(error);
            });
        }
        return Promise.reject(error);
      }
    );
  });
  return axiosSecure;
};

export default useAxios;
