import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { showBook } from "../../../_services/books";
import { createTransaction } from "../../../_services/transactions";

export default function ShowBook() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    const navigate = useNavigate();
    const accessToken = localStorage.getItem("token");
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

    // Handler untuk menambah kuantitas (Dibatasi agar tidak melebihi stok buku)
    const handleIncrement = () => {
        if (book && quantity < book.stock) {
            setQuantity(quantity + 1);
        }
    };

    // Handler untuk mengurangi kuantitas (Minimal 1)
    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // Menambahkan fungsi handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // kalo user bloman login bakal dilempar ke halaman login
        if (!accessToken) {
            alert(
                "Kamu harus login terlebih dahulu untuk melakukan transaksi!",
            );
            navigate("/login");
            return;
        }

        try {
            const payload = {
                book_id: id,
                quantity: quantity,
            };

            await createTransaction(payload);
            alert(`Berhasil memesan ${quantity} pcs buku ${book.title}!`);

            // Opsional: Balikin kuantitas ke 1 setelah sukses transaksi
            setQuantity(1);
        } catch (error) {
            console.error("Transaksi gagal:", error);
            alert("Gagal melakukan pemesanan. Coba lagi nanti.");
        }
    };

    // -------------------------------------------------------------------

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
                    {/* FOTO COVER BUKU */}
                    <div className="shrink-0 w-full max-w-[280px] lg:max-w-[320px] mx-auto">
                        <div className="relative group">
                            <div className="absolute -inset-3 border-2 border-[#006d7e]/20 rounded-2xl -z-10 translate-x-2 translate-y-2"></div>
                            <img
                                className="w-full aspect-[3/4] object-cover rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                                src={`http://127.0.0.1:8000/storage/${book.cover_photo}`}
                                alt={book.title}
                            />
                        </div>

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

                        {/* SEKSI AKSI: Tombol Beli & Pengatur Jumlah */}
                        <form
                            onSubmit={handleSubmit}
                            className="mt-6 sm:mt-8 space-y-4"
                        >
                            {/* 1. Input Tersembunyi (Hidden) */}
                            <input
                                type="hidden"
                                name="quantity"
                                value={quantity}
                            />

                            {/* 2. Komponen UI Interaktif */}
                            <div className="flex items-center gap-4">
                                {/* UBAH: Menjadi type="submit" agar mendeteksi onSubmit form */}
                                <button
                                    type="submit"
                                    className="text-white bg-indigo-600 hover:bg-indigo-700 font-bold rounded-xl px-12 py-3 transition-colors"
                                >
                                    Beli
                                </button>

                                {/* Komponen Counter Custom */}
                                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 shadow-sm overflow-hidden h-[50px]">
                                    <button
                                        type="button"
                                        onClick={handleDecrement}
                                        disabled={quantity <= 1}
                                        className="px-4 h-full bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-100 dark:hover:bg-gray-600 active:bg-gray-200 dark:active:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        &minus;
                                    </button>
                                    <span className="px-6 h-full flex items-center bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold min-w-[60px] justify-center border-x border-gray-200 dark:border-gray-700 select-none">
                                        {quantity}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={handleIncrement}
                                        disabled={quantity >= book.stock}
                                        className="px-4 h-full bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-100 dark:hover:bg-gray-600 active:bg-gray-200 dark:active:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        &#43;
                                    </button>
                                </div>
                            </div>
                        </form>

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
