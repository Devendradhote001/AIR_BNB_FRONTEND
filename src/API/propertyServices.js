import { toast } from "react-toastify";
import axios from "./axiosConfig.js";

export const getAllProperties = async () => {
  try {
    const res = await axios.get("/property/all-properties");
    toast.success(res.data.message);
    return res;
  } catch (error) {
    console.log("error->", error.response.data.message);
    toast.error(error.response.data.message);
  }
};

export const getPropertyDetails = async (id) => {
  console.log("in service", id);
  try {
    const res = await axios.get(`/property/view/${id}`);
    toast.success(res.data.message);
    return res;
  } catch (error) {
    console.log("error->", error.response.data.message);
    toast.error(error.response.data.message);
  }
};

export const createPropertyService = async (data) => {
  try {
    const res = await axios.post(`/property/create`, data);
    toast.success(res.data.message);
    return res;
  } catch (error) {
    console.log("error->", error.response.data.message);
    toast.error(error.response.data.message);
  }
};
