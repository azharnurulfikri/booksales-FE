import { useEffect, useState } from "react";
import { getbooks } from "../../../_services/books";
import { Link } from "react-router-dom";

export default function Books() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getbooks();
                setBooks(response);
            } catch (error) {
                console.error("Gagal ambil data buku:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px] font-sans text-gray-500">
                <div className="animate-pulse">Memuat Katalog Buku...</div>
            </div>
        );
    }

    return (
        // Menggunakan font-sans agar lebih modern sesuai referensi
        <section className="bg-[#fdfdfd] py-12 antialiased dark:bg-gray-900 md:py-20 font-sans">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                
                {/* Heading Tengah ala Featured Books */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] dark:text-white mb-4">
                        Featured Books
                    </h2>
                    <p className="text-gray-500 max-w-lg mx-auto text-sm">
                        Temukan koleksi buku pilihan terbaik untuk menemani perjalanan literasi Anda hari ini.
                    </p>
                </div>

                {/* Grid Container */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {books.length > 0 ? (
                        books.map((book) => (
                            <div
                                key={book.id}
                                className="group flex flex-col items-center text-center transition-all duration-300"
                            >
                                {/* Container Gambar ala Referensi (Shadow Soft & Rounded) */}
                                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl shadow-md transition-shadow group-hover:shadow-xl">
                                    <Link to={`/books/show/${book.id}`}>
                                        <img
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            src={
                                                book.cover_photo
                                                    ? `http://127.0.0.1:8000/storage/${book.cover_photo}`
                                                    : "https://via.placeholder.com/300x400"
                                            }
                                            alt={book.title}
                                        />
                                    </Link>
                                </div>

                                {/* Info Buku (Penempatan Element Sesuai Referensi) */}
                                <div className="mt-5 w-full flex flex-col items-center">
                                    {/* Judul Buku (Font Bold & Modern) */}
                                    <Link
                                        to={`/books/show/${book.id}`}
                                        className="text-lg font-bold text-[#1a1a1a] hover:text-[#006d7e] dark:text-white transition-colors line-clamp-1 uppercase tracking-tight"
                                    >
                                        {book.title}
                                    </Link>

                                    {/* Genre (Text Small & Muted) */}
                                    <span className="mt-1 text-xs font-semibold text-[#006d7e] uppercase tracking-widest">
                                        {book.genre?.name || "General"}
                                    </span>

                                    {/* Harga (Font Bold) */}
                                    <p className="mt-2 text-md font-bold text-gray-800 dark:text-gray-300">
                                        {formatRupiah(book.price)}
                                    </p>

                                    {/* Tombol Detail (Warna Teal ala The Bookspot) */}
                                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full px-2">
                                        <Link
                                            to={`/books/show/${book.id}`}
                                            className="block w-full rounded-full bg-[#006d7e] px-4 py-2 text-xs font-bold text-white hover:bg-[#005a68] transition-all transform hover:-translate-y-0.5"
                                        >
                                            Detail
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-gray-400">
                            Belum ada buku yang tersedia di katalog.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}