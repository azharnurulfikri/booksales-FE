import API from "../_api";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

//_____________________Buku_____________________________
export const getbooks = async (keyword = "") => {
    try {
        const response = await axios.get(`${BASE_URL}/books?search=${keyword}`);
        return response.data.data; 
    } catch (error) {
        console.error("Error fetching books from API:", error);
        throw error;
    }
};

export const showBook = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/books/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("Error showBook:", error);
        throw error;
    }
};

// FIX: Menambahkan Header Authorization Token & Multipart Form Data
export const createBook = async (bookData) => {
    const token = localStorage.getItem("token"); // Ambil token segar dari storage
    try {
        const response = await axios.post(`${BASE_URL}/books`, bookData, {
            headers: {
                "Content-Type": "multipart/form-data", // Wajib untuk upload file cover_photo
                "Authorization": `Bearer ${token}`,    // Wajib untuk melewati middleware auth Laravel
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error Validasi Laravel:", error.response?.data);
        throw error;
    }
};

// FIX: Menambahkan Header Authorization Token & Multipart Form Data untuk Update
export const updateBook = async (id, bookData) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.post(`${BASE_URL}/books/${id}`, bookData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Error updateBook:", error);
        throw error;
    }
};

// FIX: Menambahkan Header Authorization Token untuk Delete
export const deleteBook = async (id) => {
    const token = localStorage.getItem("token");
    try {
        await axios.delete(`${BASE_URL}/books/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("Error deleteBook:", error);
        throw error;
    }
};

// _____________________Genre__________________
export const getGenres = async () => {
    try {
        const { data } = await API.get("/genres");
        return data.data || data;
    } catch (error) {
        console.log("Gagal ngambil genre:", error);
        throw error;
    }
};

// ... Sisa fungsi createGenre, updateGenre, deleteGenre, dll di bawah tetap sama aman menggunakan API kustom ...
export const createGenre = async (data) => {
    try {
        const response = await API.post("/genres", data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}` // Pastiin baris ini ada
            }
        });
        return response.data;
    } catch (error) {
        console.log("Gagal create genre:", error);
        throw error;
    }
};

export const updateGenre = async (id, data) => {
    try {
        const response = await API.put(`/genres/${id}`, data);
        return response.data;
    } catch (error) {
        console.log("Gagal update genre:", error);
        throw error;
    }
};

export const deleteGenre = async (id) => {
    try {
        const response = await API.delete(`/genres/${id}`);
        return response.data;
    } catch (error) {
        console.log("Gagal hapus genre:", error);
        throw error;
    }
};

// _____________________Author__________________
export const createAuthor = async (data) => {
    try {
        const response = await API.post("/authors", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateAuthor = async (id, data) => {
    try {
        const response = await API.put(`/authors/${id}`, data);
        return response.data;
    } catch (error) {
        console.log("Gagal update author:", error);
        throw error;
    }
};

export const deleteAuthor = async (id) => {
    try {
        const response = await API.delete(`/authors/${id}`);
        return response.data;
    } catch (error) {
        console.log("Gagal hapus author:", error);
        throw error;
    }
};