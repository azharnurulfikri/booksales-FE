import { Navigate, Outlet } from "react-router-dom";
import { useDecodedToken } from "../_services/auth.js";
export default function ProtectedRoute() {
    const token = localStorage.getItem("token");
    const tokenStatus = useDecodedToken(token);

    // Jika token tidak ada atau sudah kedaluwarsa, paksa kembali ke halaman login
    if (!tokenStatus.success) {
        return <Navigate to="/login" replace />;
    }

    // Jika token valid, izinkan mengakses halaman admin (rute anak)
    return <Outlet />;
}