import { toast } from "react-toastify";
import axios from "./axiosConfig.js";

export const signUpService = async (data) => {
  try {
    const res = await axios.post("/auth/register", data);
    toast.success(res.data.message);
    return res;
  } catch (error) {
    console.log("error->", error.response.data.message);
    toast.error(error.response.data.message);
  }
};

export const loginService = async (data) => {
  try {
    const res = await axios.post("/auth/login", data);
    toast.success(res.data.message);
    return res;
  } catch (error) {
    console.log("error->", error.response.data.message);
    toast.error(error.response.data.message);
  }
};

export const currentUserService = async () => {
  try {
    const { data } = await axios.get("/auth/current-user");
    console.log(data);
    toast.success(data.message);
    return data;
  } catch (error) {
    console.log("error->", error.response.data.message);
    toast.error(error.response.data.message);
  }
};

export const logOutService = async () => {
  try {
    const { data } = await axios.post("/auth/logout");
    console.log("Logout response:", data);
    toast.success(data.message);
    return data;
  } catch (error) {
    console.log("Logout error->", error.response?.data?.message || error.message);
    toast.error(error.response?.data?.message || "Logout failed");
    throw error; 
  }
};
