import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    // 1. State untuk menampung input form (Efisien dalam 1 object)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        username: "", // Ditambahkan agar sesuai kriteria tugas
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

        // Hapus error pada input tertentu saat user mulai mengetik ulang
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    // 3. Fungsi Validasi Sederhana (Sesuai Kriteria Tugas)
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
        return Object.keys(newErrors).length === 0; // true jika tidak ada error
    };

    // 4. Handler Kirim Data ke Backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });

        // Jalankan validasi frontend
        if (!validateForm()) return;

        setLoading(true);

        // --- PERBAIKAN: Definisikan dataToSend menggunakan FormData sesuai format Postman ---
        const dataToSend = new FormData();
        dataToSend.append("name", formData.name);
        dataToSend.append("email", formData.email);
        dataToSend.append("password", formData.password);
        // ----------------------------------------------------------------------------------

        try {
            // Gunakan port 8000 sesuai konfigurasi backend Laravel-mu
            const response = await fetch("http://localhost:8000/api/register", {
                method: "POST",
                body: dataToSend, // Sekarang dataToSend sudah aman digunakan
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({
                    type: "success",
                    text: "Registrasi berhasil! Mengalihkan ke login...",
                });
                // Reset form setelah sukses
                setFormData({
                    name: "",
                    email: "",
                    username: "",
                    password: "",
                });

                // Alihkan ke halaman login setelah 2 detik
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                // Menerima pesan error dari backend jika user/email sudah terdaftar
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
        <>
            <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-full md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1>

                            {/* Alert Pesan Sukses / Gagal */}
                            {message.text && (
                                <div
                                    className={`p-4 text-sm rounded-lg text-center ${
                                        message.type === "success"
                                            ? "bg-green-50 text-green-800 dark:bg-gray-700 dark:text-green-400"
                                            : "bg-red-50 text-red-800 dark:bg-gray-700 dark:text-red-400"
                                    }`}
                                >
                                    {message.text}
                                </div>
                            )}

                            <form
                                className="space-y-4 md:space-y-6"
                                onSubmit={handleSubmit}
                            >
                                {/* Input Nama Lengkap */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:text-white ${
                                            errors.name
                                                ? "border-red-500 dark:border-red-500"
                                                : "border-gray-300 dark:border-gray-600"
                                        }`}
                                        placeholder="John Doe"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Input Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:text-white ${
                                            errors.email
                                                ? "border-red-500 dark:border-red-500"
                                                : "border-gray-300 dark:border-gray-600"
                                        }`}
                                        placeholder="name@company.com"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Input Username */}
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:text-white ${
                                            errors.username
                                                ? "border-red-500 dark:border-red-500"
                                                : "border-gray-300 dark:border-gray-600"
                                        }`}
                                        placeholder="johndoe123"
                                    />
                                    {errors.username && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.username}
                                        </p>
                                    )}
                                </div>

                                {/* Input Password */}
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:text-white ${
                                            errors.password
                                                ? "border-red-500 dark:border-red-500"
                                                : "border-gray-300 dark:border-gray-600"
                                        }`}
                                    />
                                    {errors.password && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* Terms and Conditions Checkbox */}
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="terms"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-600"
                                            required
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="terms"
                                            className="font-light text-gray-500 dark:text-gray-300"
                                        >
                                            I accept the{" "}
                                            <a
                                                className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                                                href="#"
                                            >
                                                Terms and Conditions
                                            </a>
                                        </label>
                                    </div>
                                </div>

                                {/* Tombol Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading
                                        ? "Registering..."
                                        : "Create an account"}
                                </button>

                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account?{" "}
                                    <a
                                        href="/login"
                                        className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                                    >
                                        Login here
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}