import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { useDecodedToken } from "../../_services/auth";

export default function Login() {
    const navigate = useNavigate();

    // 1. Inisialisasi State Input & UI
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // 2. Pengambilan & Dekode Token
    // BUG FIX: Menggunakan kunci "token" agar selaras dengan yang disimpan saat login
    const token = localStorage.getItem("token"); 
    const decodedData = useDecodedToken(token);

    // 3. Guest Protection (Proteksi Halaman Login)
    // BUG FIX: Dipindahkan ke Root Level komponen. Tidak boleh di dalam handleSubmit!
    useEffect(() => {
        // Jika token ditemukan dan proses dekode berhasil (sesi aktif)
        if (token && decodedData && decodedData.success) {
            // Evaluasi role untuk pengalihan (redirect) otomatis
            const userRole = decodedData.data?.role;
            navigate(userRole === "admin" ? "/admin" : "/books"); 
        }
    }, [token, decodedData, navigate]);

    // 4. Handler Input Perubahan
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 5. Handler Pengiriman Form (Submit)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Melakukan HTTP POST request ke endpoint API backend Laravel
            const response = await axios.post("http://127.0.0.1:8000/api/login", formData);
            
            if (response.data.success) {
                // Manajemen Sesi: Menyimpan kredensial ke LocalStorage
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userInfo", JSON.stringify(response.data.user)); 

                alert("Login Berhasil! Selamat datang.");
                
                // Role-Based Access Control (RBAC): Navigasi pasca-login
                if (response.data.user.role === "admin") {
                    navigate("/admin"); 
                } else {
                    navigate("/books"); 
                }
            }
        } catch (err) {
            // Penanganan Kesalahan (Error Handling) menggunakan Optional Chaining
            setError(err?.response?.data?.message || "Terjadi kesalahan pada server atau kredensial tidak valid.");
        } finally {
            // Menghentikan indikator loading
            setLoading(false);
        }
    };

    return (
        <section className="bg-gray-900 min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
                <h1 className="text-2xl font-bold text-white mb-6">Masuk ke akun Anda</h1>

                {error && (
                    <div className="p-3 mb-4 text-sm text-red-400 bg-red-900/30 border border-red-800 rounded-lg animate-pulse">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">Email Anda</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white"
                            placeholder="admin@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-300">Kata Sandi</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg disabled:opacity-50 transition-colors"
                    >
                        {loading ? "Mautentikasi..." : "Masuk"}
                    </button>
                    
                    <p className="text-sm text-gray-400">
                        Belum punya akun? <a href="/register" className="text-indigo-500 hover:underline">Daftar di sini</a>
                    </p>
                </form>
            </div>
        </section>
    );
}