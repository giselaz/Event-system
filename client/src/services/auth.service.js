import axios from "axios";

const API_URL = "/auth/";

const register = (name, surname, faculty, email, password) => {
  return axios.post(API_URL + "signup", {
    name,
    surname,
    faculty,
    email,
    password,
  });
};

const login = async (email, password) => {
  return await axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};
export default AuthService;
