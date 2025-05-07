import { toast } from "react-toastify";
import axios from "./axiosConfig.js";

export const verifyPaymentService = async (data) => {
  try {
    const res = await axios.post(`/payment/payment-verify`, data);
    toast.success(res.data.message);
    return res;
  } catch (error) {
    console.log("error->", error.response.data.message);
    toast.error(error.response.data.message);
  }
};
