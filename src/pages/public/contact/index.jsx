import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Contact = () => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("token");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!accessToken) {
            alert("Kamu harus login terlebih dahulu untuk mengirim pesan ke admin!");
            navigate("/login");
            return;
        }

        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                message: formData.message,
            };

            const response = await axios.post(
                "http://localhost:8000/api/contacts",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, 
                    },
                }
            );

            if (response.data.success) {
                alert(`Berhasil mengirim pesan ke admin!`);
                setFormData({ name: "", email: "", message: "" });
            }
        } catch (error) {
            console.error("Gagal Mengirim Pesan:", error);
            const errorMsg =
                error.response?.data?.message ||
                "Gagal mengirim pesan, coba lagi nanti.";
            alert(errorMsg);
        }
    };

    return (
        // Mengunci background ke warna gelap utama (#090d16)
        <div className="bg-[#090d16] min-h-screen pt-40 pb-20 font-sans text-gray-300 relative overflow-hidden">
            
            {/* Dekorasi Background Glow */}
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                
                {/* Header Title Section */}
                <div className="text-center mb-20">
                    <span className="text-indigo-400 font-bold tracking-[0.25em] text-xs uppercase mb-3 block">
                        Get In Touch
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                        Hubungi Kami
                    </h1>
                    <div className="w-12 h-1 bg-indigo-500 mx-auto mb-5 rounded-full"></div>
                    <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
                        Punya pertanyaan seputar koleksi buku, kendala transaksi,
                        atau ingin bekerja sama? Silakan kirimkan pesan Anda di bawah ini.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
                    
                    {/* Kolom Kiri: Informasi Kontak */}
                    <div className="space-y-8 lg:pr-8">
                        <div>
                            <h2 className="text-2xl font-black text-white tracking-tight mb-4">
                                Informasi Toko
                            </h2>
                            <p className="text-gray-400 text-sm leading-relaxed font-normal">
                                Tim dukungan kami siap membantu Anda pada hari kerja <br />
                                <span className="text-indigo-400 font-semibold">(Senin - Jumat, 09.00 - 17.00 WIB)</span>.
                            </p>
                        </div>

                        {/* Detail Alamat dengan List Kapsul Gelap Premium */}
                        <div className="space-y-3.5">
                            <div className="flex items-center space-x-4 bg-gray-900/30 border border-gray-800/40 p-4 rounded-2xl">
                                <span className="text-xl bg-indigo-950/60 border border-indigo-500/20 w-10 h-10 rounded-xl flex items-center justify-center">📍</span>
                                <p className="text-sm text-gray-300 font-medium">
                                    Jl. Raya Lenteng Agung No. 20, Jakarta Selatan
                                </p>
                            </div>
                            <div className="flex items-center space-x-4 bg-gray-900/30 border border-gray-800/40 p-4 rounded-2xl">
                                <span className="text-xl bg-purple-950/60 border border-purple-500/20 w-10 h-10 rounded-xl flex items-center justify-center">📧</span>
                                <p className="text-sm text-gray-300 font-medium">
                                    support@booksales.com
                                </p>
                            </div>
                            <div className="flex items-center space-x-4 bg-gray-900/30 border border-gray-800/40 p-4 rounded-2xl">
                                <span className="text-xl bg-pink-950/60 border border-pink-500/20 w-10 h-10 rounded-xl flex items-center justify-center">📞</span>
                                <p className="text-sm text-gray-300 font-medium">+62 812-3456-7890</p>
                            </div>
                        </div>
                    </div>

                    {/* Kolom Ranan: Form Kirim Pesan (Glassmorphism Dark) */}
                    <div className="bg-gray-900/40 backdrop-blur-sm p-6 sm:p-10 rounded-[2rem] shadow-[0_30px_70px_rgba(0,0,0,0.4)] border border-gray-800/60">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 text-sm text-white bg-gray-950/50 border border-gray-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:outline-none transition-all duration-300 placeholder-gray-700"
                                    placeholder="Masukkan nama lengkap"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 text-sm text-white bg-gray-950/50 border border-gray-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:outline-none transition-all duration-300 placeholder-gray-700"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                                    Pesan Anda
                                </label>
                                <textarea
                                    rows="4"
                                    required
                                    className="w-full px-4 py-3 text-sm text-white bg-gray-950/50 border border-gray-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:outline-none transition-all duration-300 placeholder-gray-700 resize-none"
                                    placeholder="Tulis pertanyaan atau pesanmu di sini..."
                                    value={formData.message}
                                    onChange={(e) =>
                                        setFormData({ ...formData, message: e.target.value })
                                    }
                                ></textarea>
                            </div>
                            
                            {/* Tombol Kirim Pesan Kapsul Bulat */}
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-3.5 rounded-full font-bold text-sm hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all duration-300 transform active:scale-95"
                            >
                                Kirim Pesan
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;