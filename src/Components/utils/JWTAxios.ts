import axios from "axios";
import store from "../redux/store";

//יצירת אובייקט מוכן של
//axios => singleTon
const jwtAxios = axios.create();

//Request Interceptor - מה אנחנו רוצים לבצע מראש בעת שליחת בקשה לשרת  "Bearer "+"jwt token"+
{/*jwtAxios.interceptors.request.use(request=>{
    request.headers = {
        "authorization" : "Bearer "+"jwt token" + store.getState().authState.loginUser.token,
    }
    return request;
});

jwtAxios.interceptors.response.use(response=>{
    store.getState().authState.loginUser.token = response.headers.Authorization;
    localStorage.setItem("token",store.getState().authState.loginUser.token);
})*/}

jwtAxios.interceptors.request.use(request=>{
    request.headers = {
        "authorization" : store.getState().authState.loginUser.token,
    }
    return request;
});

jwtAxios.interceptors.response.use(response=>{
    store.getState().authState.loginUser.token = response.headers.Authorization;
    localStorage.setItem("token",store.getState().authState.loginUser.token);
})

export default jwtAxios;