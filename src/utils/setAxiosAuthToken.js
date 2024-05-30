import axios from "axios"

export const setAxiosAuthToken = (token) => {
    if(typeof token !== 'undefined' && token){
        axios.defaults.headers.common['Authorization'] = "Token " + token;
    }else{
        delete axios.defaults.headers.common['Authorization']
    }
}