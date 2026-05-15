import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { showBook } from "../../../_services/books";

export default function ShowBook() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookDetail = async () => {
            try {
                const bookData = await showBook(id);
                setBook(bookData);
            } catch (error) {
                console.error("Gagal ngambil detail buku:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetail();
    }, [id]);

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(number);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-[#111827]">
                <span className="text-xl font-bold text-white">
                    Loading data...
                </span>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-[#111827]">
                <h2 className="mb-4 text-2xl font-bold text-white">
                    Buku tidak ditemukan!
                </h2>
                <Link to="/books" className="text-indigo-400 hover:underline">
                    Kembali ke Katalog
                </Link>
            </div>
        );
    }

    return (
        <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased min-h-screen flex items-center">
            <div className="max-w-screen-xl px-4 mx-auto w-full 2xl:px-0">
                <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16 items-center">
                    {/* FOTO COVER BUKU (Ukuran Dikecilkan & Estetik) */}
                    <div className="shrink-0 w-full max-w-[280px] lg:max-w-[320px] mx-auto">
                        <div className="relative group">
                            {/* Dekorasi Garis di Belakang ala The BOOKSPOT */}
                            <div className="absolute -inset-3 border-2 border-[#006d7e]/20 rounded-2xl -z-10 translate-x-2 translate-y-2"></div>

                            <img
                                className="w-full aspect-[3/4] object-cover rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                                src={`http://127.0.0.1:8000/storage/${book.cover_photo}`}
                                alt={book.title}
                            />
                        </div>

                        {/* Tombol Kembali yang Manis */}
                        <div className="mt-8 text-center">
                            <Link
                                to="/books"
                                className="text-sm font-bold text-[#006d7e] hover:text-[#005a68] flex items-center justify-center gap-2 transition-colors"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                                </svg>
                                Kembali ke Katalog
                            </Link>
                        </div>
                    </div>
                    {/* DETAIL BUKU */}
                    <div className="mt-8 sm:mt-10 lg:mt-0 bg-gray-800/50 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-700">
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                            {book.title}
                        </h1>

                        <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                            <p className="text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-white">
                                {formatRupiah(book.price)}
                            </p>

                            <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className="w-5 h-5 text-yellow-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                                    (5.0)
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <span className="bg-indigo-900 text-indigo-300 text-sm font-semibold px-3 py-1 rounded-md">
                                Genre: {book.genre?.name || "-"}
                            </span>
                            <span className="bg-gray-700 text-gray-300 text-sm font-semibold px-3 py-1 rounded-md">
                                Author: {book.author?.name || "-"}
                            </span>
                            <span className="bg-emerald-900 text-emerald-300 text-sm font-semibold px-3 py-1 rounded-md">
                                Stok: {book.stock} pcs
                            </span>
                        </div>

                        <div className="mt-8">
                            <button className="w-full sm:w-auto text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-bold rounded-xl text-md px-8 py-3.5 flex items-center justify-center transition-all duration-200 shadow-lg">
                                <svg
                                    className="w-6 h-6 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    ></path>
                                </svg>
                                Tambah ke Keranjang
                            </button>
                        </div>

                        <hr className="my-8 border-gray-700" />

                        <div className="text-gray-400 leading-relaxed">
                            <h3 className="text-lg font-bold mb-3 text-white">
                                Deskripsi Buku:
                            </h3>
                            <p className="whitespace-pre-wrap">
                                {book.description ||
                                    "Belum ada deskripsi untuk buku ini."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
