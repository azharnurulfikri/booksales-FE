import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; 

export const getContacts = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/contacts`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};