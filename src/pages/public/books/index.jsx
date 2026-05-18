import { useEffect, useState } from "react";
import { getbooks } from "../../../_services/books";
import { Link, useSearchParams } from "react-router-dom";

export default function Books() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // 1. Ambil query parameter "?search=" dari URL browser
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("search") || "";

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Aktifkan loading kembali setiap kali user mencari kata kunci baru
            try {
                // 2. Kirim keyword pencarian ke dalam fungsi service API getbooks
                const response = await getbooks(keyword);
                setBooks(response);
            } catch (error) {
                console.error("Gagal ambil data buku:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [keyword]); // 3. Masukkan 'keyword' di sini agar useEffect berjalan ulang setiap kali keyword berubah

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[500px] font-sans bg-[#090d16] text-gray-500">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <div className="text-xs tracking-widest uppercase font-bold text-gray-500 animate-pulse">Loading Catalog...</div>
                </div>
            </div>
        );
    }

    return (
        <section className="bg-[#090d16] py-20 antialiased font-sans border-t border-gray-900/60 relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 relative z-10">
                
                {/* Heading Tengah Minimalis Modern */}
                <div className="text-center mb-16">
                    <span className="text-indigo-400 font-bold tracking-[0.25em] text-xs uppercase mb-3 block">
                        Our Collections
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
                        {keyword ? `Search Results for "${keyword}"` : "Featured Books"}
                    </h2>
                    <div className="w-12 h-1 bg-indigo-500 mx-auto mb-5 rounded-full"></div>
                    <p className="text-gray-400 max-w-md mx-auto text-sm leading-relaxed">
                        {keyword 
                            ? `Menampilkan koleksi buku yang cocok dengan pencarian Anda.`
                            : "Temukan koleksi buku pilihan terbaik untuk menemani perjalanan literasi Anda hari ini."
                        }
                    </p>
                </div>

                {/* Grid Container */}
                <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {books.length > 0 ? (
                        books.map((book) => (
                            <div
                                key={book.id}
                                className="group flex flex-col items-center text-center transition-all duration-300"
                            >
                                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gray-900 shadow-[0_15px_35px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:shadow-[0_25px_50px_rgba(99,102,241,0.2)] group-hover:-translate-y-1">
                                    <Link to={`/books/show/${book.id}`}>
                                        <img
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            src={
                                                book.cover_photo
                                                    ? `http://127.0.0.1:8000/storage/${book.cover_photo}`
                                                    : "https://via.placeholder.com/300x400"
                                            }
                                            alt={book.title}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                                    </Link>
                                </div>

                                <div className="mt-4 w-full flex flex-col items-center px-1">
                                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1.5">
                                        {book.genre?.name || "General"}
                                    </span>

                                    <Link
                                        to={`/books/show/${book.id}`}
                                        className="text-base font-bold text-white hover:text-indigo-400 transition-colors duration-200 line-clamp-1 tracking-tight"
                                    >
                                        {book.title}
                                    </Link>

                                    <p className="mt-1 text-xs font-semibold text-gray-400">
                                        {formatRupiah(book.price)}
                                    </p>

                                    <div className="mt-4 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 w-full max-w-[140px]">
                                        <Link
                                            to={`/books/show/${book.id}`}
                                            className="block w-full rounded-full bg-indigo-600 px-4 py-2 text-[11px] font-bold text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-24 text-gray-500 text-sm tracking-wide">
                            Tidak ada buku yang cocok dengan judul "{keyword}".
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}