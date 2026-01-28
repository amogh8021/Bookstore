import axios from "axios";

const API_URL = "http://localhost:8080/payment";

export const createRazorpayOrder = async (amount) => {
    const token = localStorage.getItem("token");
    return axios.post(`${API_URL}/create-order/${amount}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const verifyPayment = async (data) => {
    const token = localStorage.getItem("token");
    return axios.post(`${API_URL}/verify`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
