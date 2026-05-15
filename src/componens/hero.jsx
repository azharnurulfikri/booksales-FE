import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    // Padding top besar agar tidak tertutup navbar fixed, bg off-white untuk kesan premium
    <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-32 overflow-hidden bg-[#fdfdfd] dark:bg-gray-900 font-sans">
      
      {/* Background Decoration (Soft Teal Glow) - Memberikan kedalaman visual */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#006d7e] rounded-full blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="flex flex-wrap items-center -mx-4">
          
          {/* KOLOM KIRI: Teks & CTA */}
          <div className="w-full lg:w-1/2 px-4 mb-12 lg:mb-0">
            <div className="max-w-xl">
              <span className="inline-block py-1.5 px-4 mb-6 text-xs font-bold tracking-[0.2em] text-[#006d7e] uppercase bg-[#006d7e]/10 rounded-full">
                Welcome to The Bookspot
              </span>
              
              <h1 className="mb-8 text-5xl lg:text-7xl font-extrabold tracking-tight text-[#1a1a1a] dark:text-white leading-[1.1]">
                Today a <span className="text-[#006d7e]">Reader</span>, <br /> 
                Tomorrow a <span className="text-[#006d7e]">Leader</span>.
              </h1>
              
              <p className="mb-10 text-lg lg:text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg">
                Jelajahi dunia tanpa batas melalui lembaran cerita. Kami menghadirkan koleksi literatur pilihan untuk menginspirasi setiap langkah perjalananmu.
              </p>
              
              <div className="flex flex-wrap gap-4">
                {/* Tombol Utama Teal */}
                <Link 
                  to="/books"
                  className="px-10 py-4 text-white font-bold bg-[#006d7e] hover:bg-[#005a68] rounded-full transition duration-300 shadow-lg shadow-[#006d7e]/20 transform hover:-translate-y-1 text-center"
                >
                  Mulai Membaca
                </Link>
                {/* Tombol Outline */}
                <button className="px-10 py-4 text-[#1a1a1a] dark:text-white font-bold border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full transition duration-300 text-center">
                  Lihat Katalog
                </button>
              </div>

              
              
            </div>
          </div>

          {/* KOLOM KANAN: Visual Visual Person Reading (Sudah Dikecilkan) */}
          <div className="w-full lg:w-1/2 px-4 flex justify-center lg:justify-end">
            {/* max-w-sm di mobile dan max-w-md di desktop agar tidak kebesaran */}
            <div className="relative w-full max-w-sm lg:max-w-md">
              
              {/* Efek Garis Dekoratif di Belakang Gambar */}
              <div className="absolute -inset-4 border-2 border-[#006d7e]/20 rounded-[2.5rem] -z-10 translate-x-3 translate-y-3"></div>

              {/* Container Gambar Utama */}
              <div className="relative z-10 overflow-hidden rounded-[2.5rem] shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800" 
                  alt="Reading Person" 
                  className="w-full h-auto object-cover transform hover:scale-105 transition duration-700"
                />
              </div>
              
              {/* Floating Card Koleksi (Ukuran Proporsional) */}
              <div className="absolute -bottom-6 -left-8 z-20 bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-50 dark:border-gray-700 hidden sm:block">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-[#006d7e] rounded-full flex items-center justify-center text-white shadow-inner">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 4.804A7.993 7.993 0 002 12a7.993 7.993 0 007 7.196V4.804z"></path>
                      <path fillRule="evenodd" d="M11 4.804V19.196A7.993 7.993 0 0018 12a7.993 7.993 0 00-7-7.196z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-900 dark:text-white leading-none">10k+ Koleksi</p>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">Buku Terkurasi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}