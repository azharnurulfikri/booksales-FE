import React from 'react';

export default function Testimonial() {
  const testimonials = [
    {
      name: "Andrea Hirata",
      role: "Penulis Laskar Pelangi",
      content: "Platform ini adalah surga bagi para pecinta literasi. Proses pencarian bukunya sangat intuitif, dan koleksi yang tersedia benar-benar dikurasi dengan kualitas terbaik.",
      avatar: "https://ui-avatars.com/api/?name=Andrea+Hirata&background=6366f1&color=fff&bold=true"
    },
    {
      name: "Najwa Shihab",
      role: "Duta Baca Indonesia",
      content: "Menemukan toko buku yang bersih, modern, dan lengkap secara digital bukanlah hal mudah. The Bookspot berhasil menghadirkan pengalaman membaca ke level yang baru.",
      avatar: "https://ui-avatars.com/api/?name=Najwa+Shihab&background=6366f1&color=fff&bold=true"
    },
    {
      name: "Fiersa Besari",
      role: "Penulis & Musisi",
      content: "Seringkali saya bingung mencari referensi buku untuk lagu saya, tapi di sini kategorinya sangat tertata. Navigasinya mulus, sehalus alur cerita dalam sebuah novel.",
      avatar: "https://ui-avatars.com/api/?name=Fiersa+Besari&background=6366f1&color=fff&bold=true"
    }
  ];

  return (
    <section className="py-24 bg-[#090d16] relative overflow-hidden font-sans border-t border-gray-900/60">
      
      {/* Dekorasi Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 right-10 w-80 h-80 bg-indigo-500 rounded-full blur-[130px]"></div>
        <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-purple-500 rounded-full blur-[130px]"></div>
      </div>

      <div className="max-w-screen-xl px-4 mx-auto lg:px-6 relative z-10">
        
        <div className="max-w-screen-md mx-auto mb-20 text-center">
          <span className="text-indigo-400 font-bold tracking-[0.25em] text-xs uppercase mb-3 block">
             Testimonials
          </span>
          
          {/* JUDUL: Mengubah warna "Pembaca" menjadi Indigo-400 yang cerah */}
          <h2 className="mb-4 text-4xl lg:text-5xl font-black tracking-tight text-white">
            Apa Kata <span className="text-indigo-400">Pembaca</span> Kami?
          </h2>
          
          <div className="w-16 h-1 bg-indigo-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-base lg:text-lg text-gray-400 max-w-xl mx-auto">
            Dengarkan langsung dari mereka yang telah menemukan inspirasi baru lewat rak buku digital kami.
          </p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <div 
              key={index}
              className="p-8 bg-gray-900/40 backdrop-blur-sm border border-gray-800/60 rounded-3xl transition-all duration-300 hover:shadow-[0_20px_50px_rgba(99,102,241,0.1)] hover:-translate-y-1.5 group"
            >
              <div className="flex mb-6 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <blockquote className="mb-8">
                <p className="text-gray-300 text-base lg:text-[17px] leading-relaxed font-normal">
                  "{item.content}"
                </p>
              </blockquote>

              <div className="flex items-center gap-4 border-t border-gray-800/50 pt-6">
                <img 
                  className="w-11 h-11 rounded-full ring-4 ring-indigo-500/10 object-cover" 
                  src={item.avatar} 
                  alt={item.name} 
                />
                <div className="text-left">
                  <div className="font-bold text-white text-base">
                    {item.name}
                  </div>
                  <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider mt-0.5">
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