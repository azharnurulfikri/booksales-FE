import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
    // Data dummy untuk jajaran buku imersif di sebelah kanan (Bisa diganti cover buku milikmu)
    const featuredBooks = [
        {
            title: "The Psychology of Money",
            cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
            rotate: "-rotate-12",
            translate: "-translate-x-8",
        },
        {
            title: "Atomic Habits",
            cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400",
            rotate: "rotate-0",
            translate:
                "z-20 translate-y-4 scale-110 shadow-[0_25px_60px_rgba(0,0,0,0.8)]",
        },
        {
            title: "Filosofi Teras",
            cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
            rotate: "rotate-12",
            translate: "translate-x-8",
        },
    ];

    return (
        <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-30 overflow-hidden bg-[#090d16] font-sans">
            {/* Background Glow Premium (Disesuaikan agar lebih halus di belakang teks) */}
            <div className="absolute top-0 left-1/4 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[150px]"></div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div className="flex flex-wrap items-center -mx-4">
                    {/* KOLOM KIRI: Teks & CTA (Mengadopsi kebersihan tipografi UI Baru) */}
                    <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
                        <div className="max-w-xl">
                            <span className="inline-block py-1.5 px-4 mb-6 text-xs font-bold tracking-[0.25em] text-indigo-300 uppercase bg-indigo-950/40 rounded-full border border-indigo-500/20">
                                Welcome to BookSales
                            </span>

                            {/* Judul dengan variasi ketebalan kontras tinggi ala intentional reading */}
                            {/* Teks Judul Hero Section - Menggunakan Hadits Riwayat Ibnu Majah */}
                            <h1 className="mb-8 text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight text-gray-400 leading-[1.1]">
                                Seeking knowledge <br />
                                <span className="font-black text-white">
                                    is a duty upon every{" "}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                                        individual.
                                    </span>
                                </span>
                            </h1>

                            
                            <p className="mb-10 text-base lg:text-lg text-gray-400 leading-relaxed max-w-md font-normal">
                                Jelajahi dunia tanpa batas melalui lembaran
                                cerita. Kami menghadirkan koleksi literatur
                                pilihan untuk menginspirasi setiap langkah
                                perjalananmu.
                            </p>

                            <div className="flex flex-wrap items-center gap-5">
                                {/* Tombol Utama - Capsule Melengkung Sempurna */}
                                <Link
                                    to="/books"
                                    className="px-10 py-4 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-full transition-all duration-300 shadow-lg shadow-indigo-600/20 transform hover:-translate-y-0.5 text-center"
                                >
                                    Mulai Membaca
                                </Link>

                               
                            </div>
                        </div>
                    </div>

                    {/* KOLOM KANAN: Immersive Showcase Jajaran Buku (Adaptasi UI Referensi) */}
                    <div className="w-full lg:w-1/2 px-4 flex items-center justify-center relative">
                        {/* Container Tumpukan Buku 3D dengan Efek Kedalaman */}
                        <div className="relative flex items-center justify-center w-full max-w-lg h-[450px]">
                            {featuredBooks.map((book, index) => (
                                <div
                                    key={index}
                                    className={`absolute w-44 h-64 sm:w-52 sm:h-76 origin-bottom transition-all duration-500 ease-out transform hover:z-30 hover:scale-105 hover:rotate-0 ${book.translate} ${book.rotate}`}
                                >
                                    {/* Frame Buku Kompak */}
                                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.6)] border border-gray-800/50 bg-gray-900">
                                        <img
                                            src={book.cover}
                                            alt={book.title}
                                            className="w-full h-full object-cover"
                                        />
                                        {/* Efek kilauan cahaya pada cover buku */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none"></div>
                                    </div>
                                </div>
                            ))}

                            {/* Efek Kabut Transparan / Gradient Fade-out di Bagian Bawah Jajaran Buku */}
                            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#090d16] via-[#090d16]/80 to-transparent z-25 pointer-events-none"></div>
                        </div>

                        {/* Floating Indicator Ornamen Penggaris Minimalis di bawah tumpukan buku */}
                        <div className="absolute -bottom-6 flex flex-col items-center opacity-40 pointer-events-none hidden sm:flex">
                            <div className="w-px h-6 bg-indigo-500 mb-1"></div>
                            <span className="text-[10px] tracking-[0.3em] uppercase text-indigo-400 font-bold">
                                Featured Catalog
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
