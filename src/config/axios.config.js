import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
    //vite template import env
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 55000,
    timeoutErrorMessage: "Server timed out",
    responseType: "json",
    headers: {
        "Content-Type": "application/json"
    }
})

axiosInstance.interceptors.response.use((axiosResponse) => {
    // console.log("interceptors", axiosResponse.data)
    return axiosResponse.data
},
    (axiosError) => {
        //401:login failed , 403: permission denied , 404: not found,
        if (Object.hasOwnProperty(axiosError.response) && axiosError.response.status === 401) {
            toast.error("Login failed")
        }
        else if (Object.hasOwnProperty(axiosError.response) &&axiosError.response.status === 403) {
            toast.error("Permission denied")
        }
        else {
            toast.error("User not found")
        }
        throw axiosError?.response
    }
)

//interceptors
//api-call ==>login.page.jsx ==>axios.config.jsx ===>interception (request interceptors)===>network===>Server===>processs===>response==>
//client==>axios.config.jsx==>intercept(response)==>login.page.jsx ===>UI


export default axiosInstance