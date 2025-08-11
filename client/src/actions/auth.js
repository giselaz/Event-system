import { AUTH } from "../redux/const/actionTypes";
import axiosInstance from "../services/helper";
import axios from "axios";

const signIn = (formData, navigate) => async (dispatch) => {
  try {
    const response = await axiosInstance.post("/auth/login", formData);
    const data = response.data;
    // localStorage.setItem("userData", data.user);
    // localStorage.setItem("currentUser", data.accessToken);
    dispatch({ type: AUTH, data });

    if (data.user.role === "admin") {
      navigate("/admin");
    } else if (data.user.role === "user") {
      navigate("/profile");
    }
  } catch (err) {
    console.log(err);
  }
};

const signInGoogle = (accessToken, navigate) => async (dispatch) => {
  try {
    const data = await axiosInstance.post("auth/login", {
      googleAccessToken: accessToken,
    });
    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (err) {
    console.log(err);
  }
};
const signUp = (formData, navigate) => async (dispatch) => {
  try {
    const data = await axiosInstance.post("/users/signup", formData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }).data;
    dispatch({ type: AUTH, data });
    navigate("/login");
  } catch (err) {}
};
const signUpGoogle = (accessToken, navigate, setError) => async (dispatch) => {
  try { 
    const data = await axios.post("users/signup", {
      googleAccessToken: accessToken,
    }).data;
    dispatch({ type: AUTH, data });
    navigate("/login");
  } catch (error) {
    if (error.response && error.response.data) {
      setError(error.response.data.message);
      navigate("/login");
    }
  }
};

export { signIn, signInGoogle, signUp, signUpGoogle };
