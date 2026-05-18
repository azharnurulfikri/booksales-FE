import axios from "axios";

export const getUsers = async () => {
    // 1. Ambil token dari localStorage yang disimpen pas login
    const token = localStorage.getItem("token");

    const response = await axios.get("http://127.0.0.1:8000/api/users", {
        headers: {
            Authorization: `Bearer ${token}` // Kirim token ke backend
        }
    }); 
    
    return response.data;
};