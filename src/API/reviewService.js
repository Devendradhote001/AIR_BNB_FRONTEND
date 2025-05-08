import { toast } from "react-toastify";
import axios from "./axiosConfig.js";

export const createReviewService = async (data) => {
  try {
    const res = await axios.post(`/review/create`, data);
    toast.success(res.data.message);
    return res;
  } catch (error) {
    console.log("error->", error.response.data.message);
    toast.error(error.response.data.message);
  }
};

export const getAllReviewsServices = async (id) => {
  try {
    const res = await axios.get(`/review/view/${id}`);
    toast.success(res.data.message);
    return res;
  } catch (error) {
    console.log("error->", error.response.data.message);
    toast.error(error.response.data.message);
  }
};

export const updateReviewServices = async (id) => {
  try {
    const res = await axios.put(`/review/update/${id}`);
    toast.success(res.data.message);
    return res;
  } catch (error) {
    console.log("error->", error.response.data.message);
    toast.error(error.response.data.message);
  }
};

export const deleteReviewServices = async (id) => {
  try {
    const res = await axios.delete(`/review/delete/${id}`);
    toast.success(res.data.message);
    return res;
  } catch (error) {
    console.log("error->", error.response.data.message);
    toast.error(error.response.data.message);
  }
};
