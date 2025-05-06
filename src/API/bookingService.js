import { toast } from "react-toastify";
import axios from "./axiosConfig.js";

export const propertyBookingService = async (data) => {
  try {
    const res = await axios.post(`/booking/create`, data);
    toast.success(res.data.message);
    return res;
  } catch (error) {
    console.log("error->", error.response.data.message);
    toast.error(error.response.data.message);
  }
};
