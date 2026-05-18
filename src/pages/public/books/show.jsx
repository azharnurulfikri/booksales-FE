import { useEffect, useState } from "react";
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

    // Handler untuk menambah kuantitas (Dibatasi stok)
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

    // ==========================================
    // FUNGSI BUY NOW (MIDTRANS INTEGRATED)
    // ==========================================
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!accessToken) {
            alert("Kamu harus login terlebih dahulu untuk melakukan transaksi!");
            navigate("/login");
            return;
        }

        try {
            const payload = {
                book_id: id,
                quantity: quantity,
            };

            // 1. Tembak API dan simpan responsenya (termasuk token)
            const response = await createTransaction(payload);
            const snapToken = response.snap_token;

            // 2. Panggil Popup Midtrans kalau tokennya ada
            if (snapToken) {
                window.snap.pay(snapToken, {
                    onSuccess: function (result) {
                        alert(`Berhasil membayar ${quantity} pcs buku ${book.title}!`);
                        console.log(result);
                        setQuantity(1);
                        // Opsional: Lu bisa navigate ke halaman invoice/riwayat pesanan di sini
                        // navigate("/transactions");
                    },
                    onPending: function (result) {
                        alert("Menunggu pembayaran diselesaikan...");
                        console.log(result);
                    },
                    onError: function (result) {
                        alert("Pembayaran gagal diproses!");
                        console.log(result);
                    },
                    onClose: function () {
                        alert("Kamu menutup popup sebelum menyelesaikan pembayaran.");
                    }
                });
            } else {
                alert("Gagal memuat token pembayaran dari server.");
            }

        } catch (error) {
            console.error("Transaksi gagal:", error);
            alert("Gagal melakukan pemesanan. Coba lagi nanti.");
        }
    };

    // ==========================================
    // FUNGSI ADD TO CART (LOCAL STORAGE)
    // ==========================================
    const handleAddToCart = async (e) => {
        e.preventDefault();

        if (!accessToken) {
            alert("Kamu harus login terlebih dahulu untuk memasukkan buku ke keranjang!");
            navigate("/login");
            return;
        }

        try {
            const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
            const existingIndex = currentCart.findIndex(item => item.book_id === id);

            if (existingIndex > -1) {
                const newQty = currentCart[existingIndex].quantity + quantity;
                
                if (newQty > book.stock) {
                    alert(`Gagal! Jumlah di keranjang melebihi stok yang tersedia (${book.stock} pcs).`);
                    return;
                }
                currentCart[existingIndex].quantity = newQty;
            } else {
                currentCart.push({
                    book_id: id,
                    quantity: quantity
                });
            }

            localStorage.setItem("cart", JSON.stringify(currentCart));
            window.dispatchEvent(new Event("cartUpdated"));

            alert(`Berhasil memasukkan ${quantity} pcs buku ${book.title} ke dalam keranjang!`);
            setQuantity(1);
        } catch (error) {
            console.error("Gagal menambahkan ke keranjang:", error);
            alert("Gagal menambahkan ke keranjang. Coba lagi nanti.");
        }
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number);
    };

    // Loading State
    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-[#090d16] font-sans">
                <div className="w-9 h-9 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <span className="text-xs tracking-[0.2em] font-bold text-gray-500 uppercase animate-pulse">
                    Fetching Details...
                </span>
            </div>
        );
    }

    // Error State
    if (!book) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-[#090d16] font-sans">
                <h2 className="mb-4 text-xl font-bold text-white tracking-tight">
                    Buku tidak ditemukan!
                </h2>
                <Link
                    to="/books"
                    className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 hover:underline transition"
                >
                    Kembali ke Katalog
                </Link>
            </div>
        );
    }

    return (
        <section className="py-12 bg-[#090d16] md:py-24 antialiased min-h-screen flex items-center font-sans relative overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="max-w-screen-xl px-4 mx-auto w-full 2xl:px-0 relative z-10">
                <div className="lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-20 items-center">
                    {/* FOTO COVER BUKU */}
                    <div className="shrink-0 w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[340px] mx-auto mb-10 lg:mb-0">
                        <div className="relative group">
                            <div className="absolute -inset-4 border-2 border-indigo-500/10 rounded-[2rem] -z-10 translate-x-3 translate-y-3"></div>
                            <img
                                className="w-full aspect-[3/4] object-cover rounded-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.7)] border border-gray-800/40 transition-transform duration-700 group-hover:scale-[1.01]"
                                src={`http://127.0.0.1:8000/storage/${book.cover_photo}`}
                                alt={book.title}
                            />
                        </div>

                        <div className="mt-10 text-center">
                            <Link
                                to="/books"
                                className="text-xs tracking-wider uppercase font-bold text-gray-500 hover:text-white flex items-center justify-center gap-2 transition-colors duration-200"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Kembali ke Katalog
                            </Link>
                        </div>
                    </div>

                    {/* DETAIL BUKU */}
                    <div className="bg-gray-900/40 backdrop-blur-sm p-6 sm:p-10 rounded-[2rem] shadow-[0_30px_70px_rgba(0,0,0,0.4)] border border-gray-800/60">
                        <h1 className="text-2xl font-black text-white sm:text-4xl tracking-tight leading-tight">
                            {book.title}
                        </h1>

                        <div className="mt-5 sm:items-center sm:gap-5 sm:flex">
                            <p className="text-3xl font-black text-white sm:text-4xl tracking-tight">
                                {formatRupiah(book.price)}
                            </p>

                            <div className="flex items-center gap-2 mt-2 sm:mt-0 bg-gray-900/60 px-3 py-1.5 rounded-full border border-gray-800/50 w-fit">
                                <div className="flex items-center gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-xs font-bold text-gray-400 leading-none">
                                    (5.0)
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-2.5">
                            <span className="bg-indigo-950/60 text-indigo-300 border border-indigo-500/20 text-xs font-bold px-3.5 py-1.5 rounded-xl uppercase tracking-wider">
                                Genre: {book.genre?.name || "General"}
                            </span>
                            <span className="bg-gray-800/60 text-gray-300 border border-gray-700/50 text-xs font-bold px-3.5 py-1.5 rounded-xl uppercase tracking-wider">
                                Author: {book.author?.name || "-"}
                            </span>
                            <span className="bg-emerald-950/60 text-emerald-400 border border-emerald-500/20 text-xs font-bold px-3.5 py-1.5 rounded-xl uppercase tracking-wider">
                                Stok: {book.stock} pcs
                            </span>
                        </div>

                        {/* SEKSI AKSI FORM */}
                        <form className="mt-8 space-y-4">
                            <input type="hidden" name="quantity" value={quantity} />

                            <div className="flex flex-wrap items-center gap-4">
                                {/* Tombol Add to Cart */}
                                <button
                                    type="button"
                                    onClick={handleAddToCart}
                                    className="px-8 h-[50px] text-sm font-bold text-indigo-400 border border-indigo-500/30 bg-indigo-950/20 hover:bg-indigo-950/50 rounded-full transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Add to Cart
                                </button>

                                {/* Tombol Buy Now */}
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="px-10 h-[50px] text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-full shadow-lg shadow-indigo-600/20 transition-all active:scale-95 flex items-center justify-center"
                                >
                                    Buy Now
                                </button>

                                {/* Counter Kuantitas */}
                                <div className="flex items-center border border-gray-800 bg-gray-950/40 rounded-full shadow-inner overflow-hidden h-[50px]">
                                    <button
                                        type="button"
                                        onClick={handleDecrement}
                                        disabled={quantity <= 1}
                                        className="px-4 h-full text-gray-400 font-bold hover:bg-gray-900 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        &minus;
                                    </button>
                                    <span className="px-5 h-full flex items-center text-white font-bold min-w-[50px] justify-center text-sm border-x border-gray-900/60 select-none">
                                        {quantity}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={handleIncrement}
                                        disabled={quantity >= book.stock}
                                        className="px-4 h-full text-gray-400 font-bold hover:bg-gray-900 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        &#43;
                                    </button>
                                </div>
                            </div>
                        </form>

                        <hr className="my-8 border-gray-800/80" />

                        <div className="text-gray-400 text-sm leading-relaxed">
                            <h3 className="text-base font-bold mb-3 text-white tracking-tight">
                                Deskripsi Buku:
                            </h3>
                            <p className="whitespace-pre-wrap font-normal text-gray-400">
                                {book.description || "Belum ada deskripsi untuk buku ini."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}