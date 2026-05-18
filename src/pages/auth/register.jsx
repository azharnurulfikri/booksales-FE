import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    // 1. State untuk menampung input form (Efisien dalam 1 object)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        username: "", 
        password: "",
    });

    // State untuk validasi dan loading
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    // 2. Handler untuk mendeteksi perubahan input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    // 3. Fungsi Validasi Sederhana
    const validateForm = () => {
        let newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.name.trim())
            newErrors.name = "Nama lengkap tidak boleh kosong";
        if (!formData.username.trim())
            newErrors.username = "Username tidak boleh kosong";

        if (!formData.email.trim()) {
            newErrors.email = "Email tidak boleh kosong";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Format email tidak valid";
        }

        if (!formData.password) {
            newErrors.password = "Password tidak boleh kosong";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password minimal harus 6 karakter";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // 4. Handler Kirim Data ke Backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });

        if (!validateForm()) return;

        setLoading(true);

        // --- BUG FIX: Pastikan "username" ikut di-append agar terkirim ke Laravel ---
        const dataToSend = new FormData();
        dataToSend.append("name", formData.name);
        dataToSend.append("username", formData.username); 
        dataToSend.append("email", formData.email);
        dataToSend.append("password", formData.password);

        try {
            const response = await fetch("http://localhost:8000/api/register", {
                method: "POST",
                body: dataToSend, 
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({
                    type: "success",
                    text: "Registrasi berhasil! Mengalihkan ke login...",
                });
                setFormData({
                    name: "",
                    email: "",
                    username: "",
                    password: "",
                });

                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                setMessage({
                    type: "error",
                    text: data.message || "Registrasi gagal.",
                });
            }
        } catch (error) {
            setMessage({
                type: "error",
                text: "Gagal terhubung ke server. Pastikan backend menyala.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-[#090d16] min-h-screen flex items-center justify-center p-6 font-sans relative overflow-hidden">
            
            {/* Background Glow */}
            <div className="absolute top-1/4 right-1/3 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[130px] pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none"></div>

            {/* Container Box Glassmorphism Premium */}
            <div className="w-full max-w-md bg-gray-900/40 backdrop-blur-md rounded-[2rem] shadow-[0_30px_70px_rgba(0,0,0,0.5)] p-8 border border-gray-800/60 relative z-10 my-8">
                
                {/* Header Title Box */}
                <div className="mb-6 text-center">
                    <span className="text-indigo-400 font-bold tracking-[0.25em] text-[10px] uppercase mb-2 block">
                        Join Membership
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        Create Account
                    </h1>
                    <div className="w-8 h-1 bg-indigo-500 mx-auto mt-3 rounded-full"></div>
                </div>

                {/* Alert Pesan Sukses / Gagal */}
                {message.text && (
                    <div
                        className={`p-3.5 mb-5 text-xs font-semibold rounded-xl text-center border animate-fade-in ${
                            message.type === "success"
                                ? "bg-emerald-950/30 border-emerald-900/30 text-emerald-400"
                                : "bg-red-950/30 border-red-900/30 text-red-400"
                        }`}
                    >
                        {message.text}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Input Nama Lengkap */}
                    <div>
                        <label htmlFor="name" className="block mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                            Your Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-2.5 text-sm text-white bg-gray-950/50 border rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:outline-none transition-all duration-300 placeholder-gray-700 ${
                                errors.name ? "border-red-500/60" : "border-gray-800"
                            }`}
                            placeholder="John Doe"
                        />
                        {errors.name && (
                            <p className="mt-1 text-[11px] text-red-400 font-medium">{errors.name}</p>
                        )}
                    </div>

                    {/* Input Email */}
                    <div>
                        <label htmlFor="email" className="block mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                            Your Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-2.5 text-sm text-white bg-gray-950/50 border rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:outline-none transition-all duration-300 placeholder-gray-700 ${
                                errors.email ? "border-red-500/60" : "border-gray-800"
                            }`}
                            placeholder="name@company.com"
                        />
                        {errors.email && (
                            <p className="mt-1 text-[11px] text-red-400 font-medium">{errors.email}</p>
                        )}
                    </div>

                    {/* Input Username */}
                    <div>
                        <label htmlFor="username" className="block mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={`w-full px-4 py-2.5 text-sm text-white bg-gray-950/50 border rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:outline-none transition-all duration-300 placeholder-gray-700 ${
                                errors.username ? "border-red-500/60" : "border-gray-800"
                            }`}
                            placeholder="johndoe123"
                        />
                        {errors.username && (
                            <p className="mt-1 text-[11px] text-red-400 font-medium">{errors.username}</p>
                        )}
                    </div>

                    {/* Input Password */}
                    <div>
                        <label htmlFor="password" className="block mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full px-4 py-2.5 text-sm text-white bg-gray-950/50 border rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:outline-none transition-all duration-300 placeholder-gray-700 ${
                                errors.password ? "border-red-500/60" : "border-gray-800"
                            }`}
                            placeholder="••••••••"
                        />
                        {errors.password && (
                            <p className="mt-1 text-[11px] text-red-400 font-medium">{errors.password}</p>
                        )}
                    </div>

                    {/* Terms and Conditions Checkbox */}
                    <div className="flex items-start pt-1">
                        <div className="flex items-center h-5">
                            <input
                                id="terms"
                                type="checkbox"
                                className="w-4 h-4 border border-gray-800 rounded bg-gray-950/50 focus:ring-3 focus:ring-indigo-500/30 text-indigo-600 focus:outline-none"
                                required
                            />
                        </div>
                        <div className="ml-3 text-xs">
                            <label htmlFor="terms" className="font-light text-gray-400">
                                I accept the{" "}
                                <a className="font-bold text-indigo-400 hover:text-indigo-300 hover:underline transition" href="#">
                                    Terms and Conditions
                                </a>
                            </label>
                        </div>
                    </div>

                    {/* Tombol Submit Kapsul Bulat Penuh */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-[46px] bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-full shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform active:scale-95 flex items-center justify-center tracking-wide pt-1"
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Registering...</span>
                            </div>
                        ) : (
                            "Create an account"
                        )}
                    </button>

                    {/* Tautan ke Halaman Login */}
                    <div className="text-center pt-3 border-t border-gray-800/40 mt-4">
                        <p className="text-xs text-gray-500 font-medium">
                            Already have an account?{" "}
                            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-bold hover:underline transition">
                                Login here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </section>
    );
}