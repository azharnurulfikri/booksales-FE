import React from "react";

const About = () => {
    return (
        // Mengunci background ke warna gelap utama (#090d16)
        <div className="bg-[#090d16] min-h-screen font-sans overflow-hidden text-gray-300">
            {/* Background Glow Premium Hiasan Melayang */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                <div className="absolute top-32 right-10 w-96 h-96 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-[150px]"></div>
            </div>

            {/* Hero Section */}
            <section className="container mx-auto px-4 pt-40 pb-20 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
                    <div className="md:w-1/2">
                        <span className="inline-block py-1.5 px-4 mb-6 text-xs font-bold tracking-[0.25em] text-indigo-300 uppercase bg-indigo-950/40 rounded-full border border-indigo-500/20">
                            Our Story
                        </span>
                        {/* Judul dengan variasi ketebalan dan gradasi indigo-purple */}
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
                            Temukan Dunia Baru di Setiap <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                                Halaman
                            </span>
                        </h1>
                        <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-8 max-w-xl">
                            Lebih dari sekadar toko buku online. BookSales hadir
                            untuk menjembatani para pencinta literatur dengan
                            karya-karya terbaik dari berbagai genre, membangun
                            ruang membaca yang inklusif dan mudah diakses oleh
                            siapa saja.
                        </p>
                        {/* Tombol*/}
                        <button
                         to="/books"
                        className="bg-indigo-600 text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-indigo-500 transition-all duration-300 shadow-lg shadow-indigo-600/20 transform hover:-translate-y-0.5 active:scale-95">
                            Jelajahi Koleksi
                        </button>
                    </div>
                    {/* Sisi Kanan: Gambar dengan Depth Shadow Tebal */}
                    <div className="md:w-1/2 w-full">
                        <div className="relative group">
                            <div className="absolute -inset-4 border-2 border-indigo-500/10 rounded-[2rem] -z-10 translate-x-3 translate-y-3"></div>
                            <img
                                src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=800&auto=format&fit=crop"
                                alt="Tumpukan Buku Estetik"
                                className="rounded-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.7)] object-cover h-[400px] w-full border border-gray-800/50 transform hover:scale-[1.01] transition duration-500"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Nilai / Value Section (Diubah menjadi warna transparan gelap imersif) */}
            <section className="py-24 border-y border-gray-900/60 relative">
                <div className="absolute inset-0 bg-gray-950/20 pointer-events-none"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-indigo-400 font-bold tracking-[0.25em] text-xs uppercase mb-3 block">
                            Core Values
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                            Kenapa Memilih BookSales?
                        </h2>
                        <div className="w-12 h-1 bg-indigo-500 mx-auto mt-4 rounded-full"></div>
                        <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
                            Kami berkomitmen memberikan pengalaman menjelajah
                            katalog dan transaksi yang mulus, aman, dan
                            tepercaya bagi seluruh komunitas pembaca.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Card 1 */}
                        <div className="bg-gray-900/40 backdrop-blur-sm p-8 rounded-3xl border border-gray-800/60 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(99,102,241,0.08)] hover:-translate-y-1.5 group">
                            <div className="w-12 h-12 bg-indigo-950/60 border border-indigo-500/20 text-blue-400 rounded-2xl flex items-center justify-center text-xl mb-6 shadow-inner">
                                📚
                            </div>
                            <h3 className="text-lg font-bold mb-3 text-white tracking-tight">
                                Kurasi Terbaik
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Mulai dari fiksi, sajak, hingga referensi
                                ilmiah. Kami memastikan kualitas bacaan yang
                                sampai ke tangan Anda adalah yang terbaik.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-gray-900/40 backdrop-blur-sm p-8 rounded-3xl border border-gray-800/60 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(99,102,241,0.08)] hover:-translate-y-1.5 group">
                            <div className="w-12 h-12 bg-purple-950/60 border border-purple-500/20 text-emerald-400 rounded-2xl flex items-center justify-center text-xl mb-6 shadow-inner">
                                ⚡
                            </div>
                            <h3 className="text-lg font-bold mb-3 text-white tracking-tight">
                                Akses Cepat
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Melalui sistem integrasi yang responsif, nikmati
                                pengalaman mencari buku dan *checkout* yang
                                mulus tanpa hambatan.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-gray-900/40 backdrop-blur-sm p-8 rounded-3xl border border-gray-800/60 transition-all duration-300 hover:shadow-[0_20px_50px_rgba(99,102,241,0.08)] hover:-translate-y-1.5 group">
                            <div className="w-12 h-12 bg-pink-950/60 border border-pink-500/20 text-purple-400 rounded-2xl flex items-center justify-center text-xl mb-6 shadow-inner">
                                🔒
                            </div>
                            <h3 className="text-lg font-bold mb-3 text-white tracking-tight">
                                Transaksi Aman
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Privasi dan keamanan data Anda adalah prioritas
                                kami. Berbelanja buku favorit dengan tenang dan
                                tepercaya.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filosofi Section */}
            <section className="container mx-auto px-4 py-24 relative z-10">
                <div className="flex flex-col-reverse md:flex-row items-center gap-16 max-w-6xl mx-auto">
                    <div className="md:w-1/2 w-full">
                        <div className="relative group">
                            <div className="absolute -inset-4 border-2 border-purple-500/10 rounded-[2rem] -z-10 -translate-x-3 translate-y-3"></div>
                            <img
                                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop"
                                alt="Membaca buku dengan tenang"
                                className="rounded-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.7)] object-cover h-[450px] w-full border border-gray-800/50 transform group-hover:scale-[1.005] transition duration-500"
                            />
                        </div>
                    </div>
                    <div className="md:w-1/2 space-y-6">
                        <span className="text-purple-400 font-bold tracking-[0.25em] text-xs uppercase block">
                            Philosophy
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                            Filosofi Kami
                        </h2>
                        <p className="text-gray-400 text-justify leading-relaxed text-sm md:text-base font-normal">
                            Kami percaya bahwa setiap buku memiliki pembacanya
                            sendiri, dan setiap lembar halaman menyimpan potensi
                            untuk mengubah sudut pandang seseorang. Buku bukan
                            sekadar kumpulan kertas, melainkan jendela menuju
                            dimensi pemikiran yang baru.
                        </p>
                        {/* Quote Block yang Disesuaikan dengan Background Gelap & Border Indigo */}
                        <div className="border-l-4 border-indigo-500 pl-6 py-3 bg-indigo-950/20 rounded-r-2xl border-y border-r border-indigo-500/10">
                            <p className="italic text-gray-300 font-medium text-sm md:text-base leading-relaxed">
                                "Membaca adalah perjalanan tanpa batas. Di
                                BookSales, kami dengan bangga mempermudah Anda
                                mendapatkan tiket perjalanan tersebut."
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
