import { Navigate, Outlet } from "react-router-dom";
import { useDecodedToken } from "../_services/auth.js"; 

export default function ProtectedRoute({ allowedRoles }) {
    const token = localStorage.getItem("token");
    const tokenStatus = useDecodedToken(token);

    // 1. Cek Autentikasi: Kalau tidak ada token / expired, lempar ke login
    if (!tokenStatus.success) {
        return <Navigate to="/login" replace />;
    }

    // Ambil data role dari hasil decode token (sesuaikan dengan nama kolom di payload JWT Laravel kamu)
    const userRole = tokenStatus.data?.role; 

    // 2. Cek Otorisasi (Role-Based Access Control) sesuai kriteria tugas
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        // Jika pembeli biasa coba-coba masuk ke dashboard admin, tendang ke katalog buku
        alert("Akses ditolak! Halaman ini khusus untuk Administrator.");
        return <Navigate to="/books" replace />;
    }

    // Jika dia adalah admin, izinkan masuk
    return <Outlet />;
}   