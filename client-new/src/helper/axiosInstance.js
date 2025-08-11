import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://event-system-yb18.onrender.com",
  baseURL: "http://localhost:4000",
});

export default axiosInstance;
