import axios from "axios";

axios.defaults.baseURL = "http://fastminder.local/";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
   
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
export default axios;
