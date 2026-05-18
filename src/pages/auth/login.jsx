import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDecodedToken } from "../../_services/auth";
// User input email/password
// Axios kirim POST login
// Laravel cek database
// Token dibuat
// Token disimpan frontend

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
    const token = localStorage.getItem("token");
    const decodedData = useDecodedToken(token);

    // 3. Guest Protection (Proteksi Halaman Login)
    useEffect(() => {
        if (token && decodedData && decodedData.success) {
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
            const response = await axios.post(
                "http://127.0.0.1:8000/api/login",
                formData,
            );

            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem(
                    "userInfo",
                    JSON.stringify(response.data.user),
                );

                alert("Login Berhasil! Selamat datang.");

                if (response.data.user.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            }
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                    "Terjadi kesalahan pada server atau kredensial tidak valid.",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        // Mengunci background ke warna gelap utama (#090d16) dan menambahkan ornamen pendaran cahaya
        <section className="bg-[#090d16] min-h-screen flex items-center justify-center p-6 font-sans relative overflow-hidden">
            {/* Background Glow Hiasan Melayang */}
            <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[130px] pointer-events-none"></div>

            {/* Container Box: Menggunakan teknik Glassmorphism & Depth Shadow */}
            <div className="w-full max-w-md bg-gray-900/40 backdrop-blur-md rounded-[2rem] shadow-[0_30px_70px_rgba(0,0,0,0.5)] p-8 sm:p-10 border border-gray-800/60 relative z-10">
                {/* Header Title Identitas BookSales */}
                <div className="mb-8 text-center">
                    <span className="text-indigo-400 font-bold tracking-[0.25em] text-[10px] uppercase mb-2 block">
                        Secure Authentication
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        Welcome Back
                    </h1>
                    <div className="w-8 h-1 bg-indigo-500 mx-auto mt-3 rounded-full"></div>
                </div>

                {/* Container Error Handling Alert */}
                {error && (
                    <div className="p-3.5 mb-5 text-xs font-semibold text-red-400 bg-red-950/30 border border-red-900/30 rounded-xl animate-fade-in flex items-center gap-2">
                        <svg
                            className="w-4 h-4 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Input Field: Email */}
                    <div>
                        <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-sm text-white bg-gray-950/50 border border-gray-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:outline-none transition-all duration-300 placeholder-gray-700"
                            placeholder="admin@example.com"
                            required
                        />
                    </div>

                    {/* Input Field: Password */}
                    <div>
                        <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                            Kata Sandi
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-sm text-white bg-gray-950/50 border border-gray-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:outline-none transition-all duration-300 placeholder-gray-700"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {/* Tombol Aksi Masuk Berbentuk Kapsul Bulat */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-[46px] bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-full shadow-lg shadow-indigo-600/20 disabled:opacity-50 transition-all duration-300 transform active:scale-95 flex items-center justify-center tracking-wide mt-2"
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Mautentikasi...</span>
                            </div>
                        ) : (
                            "Masuk Sekarang"
                        )}
                    </button>

                    {/* Tautan Navigasi Footer Form */}
                    <div className="text-center pt-3 border-t border-gray-800/40 mt-4">
                        <p className="text-xs text-gray-500 font-medium">
                            Belum punya akun?{" "}
                            <Link
                                to="/register"
                                className="text-indigo-400 hover:text-indigo-300 font-bold hover:underline transition"
                            >
                                Daftar di sini
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </section>
    );
}
