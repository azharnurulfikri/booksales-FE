import React from 'react';

export default function Testimonial() {
  const testimonials = [
    {
      name: "Andrea Hirata",
      role: "Penulis Laskar Pelangi",
      content: "Platform ini adalah surga bagi para pecinta literasi. Proses pencarian bukunya sangat intuitif, dan koleksi yang tersedia benar-benar dikurasi dengan kualitas terbaik.",
      avatar: "https://ui-avatars.com/api/?name=Andrea+Hirata&background=006d7e&color=fff"
    },
    {
      name: "Najwa Shihab",
      role: "Duta Baca Indonesia",
      content: "Menemukan toko buku yang bersih, modern, dan lengkap secara digital bukanlah hal mudah. The Bookspot berhasil menghadirkan pengalaman membaca ke level yang baru.",
      avatar: "https://ui-avatars.com/api/?name=Najwa+Shihab&background=006d7e&color=fff"
    },
    {
      name: "Fiersa Besari",
      role: "Penulis & Musisi",
      content: "Seringkali saya bingung mencari referensi buku untuk lagu saya, tapi di sini kategorinya sangat tertata. Navigasinya mulus, sehalus alur cerita dalam sebuah novel.",
      avatar: "https://ui-avatars.com/api/?name=Fiersa+Besari&background=006d7e&color=fff"
    }
  ];

  return (
    <section className="py-24 bg-[#fdfdfd] dark:bg-gray-900 relative overflow-hidden font-sans">
      {/* Dekorasi Background Soft Teal ala The BOOKSPOT */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#006d7e] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#006d7e] rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-screen-xl px-4 mx-auto lg:px-6 relative z-10">
        <div className="max-w-screen-md mx-auto mb-16 text-center">
          <span className="text-[#006d7e] font-bold tracking-[0.2em] text-xs uppercase mb-3 block">
             Testimonials
          </span>
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Apa Kata <span className="text-[#006d7e]">Pembaca</span> Kami?
          </h2>
          <div className="w-20 h-1 bg-[#006d7e] mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Dengarkan langsung dari mereka yang telah menemukan inspirasi baru lewat rak buku digital kami.
          </p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <div 
              key={index}
              className="p-8 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,109,126,0.15)] hover:-translate-y-2 group"
            >
              {/* Star Rating Warna Teal */}
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#006d7e]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <blockquote className="mb-8">
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed italic">
                  "{item.content}"
                </p>
              </blockquote>

              <div className="flex items-center gap-4 border-t border-gray-50 dark:border-gray-700/50 pt-6">
                <img className="w-12 h-12 rounded-full ring-4 ring-[#006d7e]/10 object-cover" src={item.avatar} alt={item.name} />
                <div className="text-left">
                  <div className="font-bold text-gray-900 dark:text-white text-lg">
                    {item.name}
                  </div>
                  <div className="text-sm font-semibold text-[#006d7e] uppercase tracking-wider">
                    {item.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}