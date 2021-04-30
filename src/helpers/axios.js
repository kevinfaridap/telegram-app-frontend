import swal from 'sweetalert'


const axios = require('axios')
const axiosApiInstance = axios.create();


axiosApiInstance.interceptors.request.use(
    async config => {
        if (typeof window !== "undefined") {
        // localStorage.setItem(key, value)
            config.headers = {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`,
            }
        }
    return config;
    },
    error => {
        Promise.reject(error)
    });


// Untuk respone axiosnya, disini respone jika invalid token
axiosApiInstance.interceptors.response.use((response)=>{
    return response
}, async function (error){
    if (error.response.status === 401) {
        if(error.response.data.error.message === 'Invalid Signature!'){
            swal('Invalid Token !')
            // history.push("/signin");
            if (typeof window !== "undefined") {
                localStorage.removeItem('token')
                
            }
        }
        if(error.response.data.error.message === 'Jwt expired'){
            swal('Token Expired !')
            if (typeof window !== "undefined") {
                localStorage.removeItem('token')
            }
        }
    }
})
  



export default axiosApiInstance