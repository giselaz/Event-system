import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://event-system-yb18.onrender.com",
});

export default axiosInstance;
