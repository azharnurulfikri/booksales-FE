// Mengimpor fungsi murni dari library react-jwt untuk keperluan dekode dan validasi
import { decodeToken, isExpired } from "react-jwt"; 
import API from "../_api";

/**
 * Fungsi untuk mengekstrak dan memvalidasi JSON Web Token (JWT).
 * Mengembalikan objek berisi status validasi dan payload data pengguna.
 * * @param {string} token - JWT yang disimpan di sisi klien
 * @returns {Object} Objek respons standar
 */
export const useDecodedToken = (token) => {
    // Memastikan token memiliki nilai sebelum diproses
    if (!token) {
        return {
            success: false,
            message: "Token tidak ditemukan",
            data: null
        };
    }

    try {
        // Memeriksa masa berlaku token menggunakan fungsi isExpired bawaan library
        const tokenExpired = isExpired(token);

        if (tokenExpired) {
            return {
                success: false,
                message: "Token expired",
                data: null
            };
        }

        // Mengekstrak informasi (payload) dari dalam token
        const decodedData = decodeToken(token);

        return {
            success: true,
            message: "Token valid",
            data: decodedData
        };

    } catch (error) {
        return {
            success: false,
            message: error.message,
            data: null
        };
    }
};

/**
 * Fungsi untuk menangani proses autentikasi ke server.
 * * @param {Object} credentials - Berisi email dan password pengguna
 * @returns {Object} Data respons dari server backend
 */
export const login = async ({ email, password }) => {
    try {
        // Mengirimkan request POST menggunakan instance API terpusat
        const { data } = await API.post('/login', { email, password });
        return data;
    } catch (error) {
        // Meneruskan error ke komponen antarmuka agar dapat ditampilkan kepada pengguna
        console.error(error);
        throw error;
    }
};


export const logout = async () => {
    try {
        // Ambil token dari storage, samakan key-nya yaitu "token"
        const token = localStorage.getItem("token");

        // Request ke backend Laravel
        const { data } = await API.post(`/logout`, {}, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });

        // Hapus kredensial dari browser sesuai yang kita buat di Navbar/AdminLayout
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");

        return data; 
    } catch (error) {
        console.error("Gagal melakukan logout dari server:", error);
        throw error; 
    }
};