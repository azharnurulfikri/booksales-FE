import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// Pastikan import API transaksi ini sesuai dengan lokasi file service lu
import { createTransaction } from "../../../_services/transactions";

export default function Cart() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    // Efek untuk mengambil data detail buku berdasarkan ID yang ada di keranjang
    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchCartDetails = async () => {
            try {
                const savedCart =
                    JSON.parse(localStorage.getItem("cart")) || [];
                if (savedCart.length === 0) {
                    setCartItems([]);
                    setLoading(false);
                    return;
                }

                // Fetch detail tiap buku secara paralel dari API Laravel
                const updatedItems = await Promise.all(
                    savedCart.map(async (item) => {
                        try {
                            const res = await axios.get(
                                `http://127.0.0.1:8000/api/books/${item.book_id}`,
                            );
                            const bookData = res.data.data;
                            return {
                                ...item,
                                title: bookData.title,
                                price: bookData.price,
                                stock: bookData.stock,
                                cover_photo: bookData.cover_photo,
                            };
                        } catch (err) {
                            console.error(
                                `Gagal memuat buku ID ${item.book_id}`,
                                err,
                            );
                            return null;
                        }
                    }),
                );

                // Saring jika ada buku yang gagal di-fetch (null)
                setCartItems(updatedItems.filter((i) => i !== null));
            } catch (error) {
                console.error("Error memuat data keranjang:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCartDetails();
    }, [token, navigate]);

    // Fungsi memperbarui kuantitas di state & localStorage
    const updateQuantity = (bookId, newQty) => {
        const updated = cartItems.map((item) => {
            if (item.book_id === bookId) {
                // Pastikan tidak melebihi stok dan minimal 1
                const finalQty = Math.max(1, Math.min(item.stock, newQty));
                return { ...item, quantity: finalQty };
            }
            return item;
        });

        setCartItems(updated);
        localStorage.setItem(
            "cart",
            JSON.stringify(
                updated.map(({ book_id, quantity }) => ({ book_id, quantity })),
            ),
        );
        window.dispatchEvent(new Event("cartUpdated")); // Update badge di Navbar
    };

    // Fungsi menghapus item dari keranjang
    const removeItem = (bookId) => {
        const filtered = cartItems.filter((item) => item.book_id !== bookId);
        setCartItems(filtered);
        localStorage.setItem(
            "cart",
            JSON.stringify(
                filtered.map(({ book_id, quantity }) => ({
                    book_id,
                    quantity,
                })),
            ),
        );
        window.dispatchEvent(new Event("cartUpdated")); // Update badge di Navbar
    };

    // ==========================================
    // FUNGSI CHECKOUT MIDTRANS DARI KERANJANG
    // ==========================================
    const handleCheckout = async () => {
        if (cartItems.length === 0) return;

        // KARENA BACKEND SAAT INI HANYA SUPPORT 1 BUKU,
        // KITA AMBIL BUKU PERTAMA DI KERANJANG BUAT TESTING POPUP
        const itemToCheckout = cartItems[0];

        try {
            const payload = {
                book_id: itemToCheckout.book_id,
                quantity: itemToCheckout.quantity,
            };

            // Tembak API buat dapet Snap Token
            const response = await createTransaction(payload);
            const snapToken = response.snap_token;

            if (snapToken) {
                // Panggil popup Midtrans
                window.snap.pay(snapToken, {
                    onSuccess: function (result) {
                        alert("Pembayaran berhasil diselesaikan!");
                        console.log(result);

                        // Bersihkan keranjang setelah bayar sukses
                        setCartItems([]);
                        localStorage.removeItem("cart");
                        window.dispatchEvent(new Event("cartUpdated"));

                        // Opsional: Redirect ke halaman riwayat transaksi
                        // navigate("/transactions");
                    },
                    onPending: function (result) {
                        alert("Menunggu pembayaran...");
                        console.log(result);
                    },
                    onError: function (result) {
                        alert("Pembayaran gagal!");
                        console.log(result);
                    },
                    onClose: function () {
                        alert(
                            "Kamu menutup popup sebelum menyelesaikan pembayaran.",
                        );
                    },
                });
            } else {
                alert("Gagal memuat token pembayaran dari server.");
            }
        } catch (error) {
            console.error("Checkout gagal:", error);
            alert("Terjadi kesalahan saat memproses checkout.");
        }
    };

    // Hitung total harga belanjaan
    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    // Format mata uang rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(number);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#090d16] flex items-center justify-center text-gray-400">
                <div className="animate-pulse font-medium text-sm tracking-wider">
                    Memuat Keranjang Belanja...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#090d16] text-white pt-28 pb-16 px-4 lg:px-8">
            <div className="max-w-screen-xl mx-auto">
                <h1 className="text-3xl font-black tracking-tight mb-8">
                    Shopping <span className="text-indigo-400">Cart</span>
                </h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-20 bg-gray-950/30 border border-gray-900 rounded-3xl p-8 shadow-inner">
                        <svg
                            className="w-16 h-16 mx-auto text-gray-700 mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            />
                        </svg>
                        <h2 className="text-lg font-bold text-gray-300">
                            Keranjang belanjamu kosong
                        </h2>
                        <p className="text-sm text-gray-500 mt-1 mb-6">
                            Yuk, cari buku favoritmu dan tambahkan ke sini!
                        </p>
                        <Link
                            to="/books"
                            className="inline-flex items-center px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-full transition-all active:scale-95"
                        >
                            Lihat Katalog Buku
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {/* DAFTAR ITEM DI KERANJANG */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item.book_id}
                                    className="flex flex-col sm:flex-row items-center justify-between p-5 bg-gray-950/40 border border-gray-800/50 rounded-2xl gap-5 shadow-lg backdrop-blur-sm"
                                >
                                    <div className="flex items-center gap-4 w-full sm:w-auto">
                                        <img
                                            src={
                                                item.cover_photo
                                                    ? `http://127.0.0.1:8000/storage/${item.cover_photo}`
                                                    : "https://via.placeholder.com/150"
                                            }
                                            alt={item.title}
                                            className="w-16 h-24 object-cover rounded-xl shadow-md border border-gray-800"
                                        />
                                        <div>
                                            <h3 className="font-bold text-base text-white line-clamp-1">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-indigo-400 font-semibold mt-1">
                                                {formatRupiah(item.price)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* CONTROLLER QUANTITY & DELETE */}
                                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-none pt-4 sm:pt-0 border-gray-900">
                                        <div className="flex items-center border border-gray-800 bg-gray-900/40 rounded-full h-[38px] overflow-hidden shadow-inner">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.book_id,
                                                        item.quantity - 1,
                                                    )
                                                }
                                                className="px-3 h-full text-gray-400 font-bold hover:bg-gray-800 hover:text-white transition-colors"
                                            >
                                                &minus;
                                            </button>
                                            <span className="px-4 text-xs font-bold text-white min-w-[35px] text-center select-none">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.book_id,
                                                        item.quantity + 1,
                                                    )
                                                }
                                                className="px-3 h-full text-gray-400 font-bold hover:bg-gray-800 hover:text-white transition-colors"
                                            >
                                                &#43;
                                            </button>
                                        </div>

                                        <p className="text-sm font-black text-gray-200 min-w-[100px] text-right hidden md:block">
                                            {formatRupiah(
                                                item.price * item.quantity,
                                            )}
                                        </p>

                                        <button
                                            onClick={() =>
                                                removeItem(item.book_id)
                                            }
                                            className="p-2 text-gray-500 hover:text-red-400 bg-gray-900/20 hover:bg-red-950/20 border border-transparent hover:border-red-900/30 rounded-xl transition-all"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* RINGKASAN BELANJA (TOTAL BOX) */}
                        <div className="p-6 bg-gradient-to-b from-gray-950/60 to-gray-950/20 border border-gray-800/80 rounded-3xl shadow-xl backdrop-blur-sm space-y-6">
                            <h2 className="text-lg font-bold border-b border-gray-900 pb-3">
                                Ringkasan Belanja
                            </h2>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-gray-400">
                                    <span>Total Item</span>
                                    <span className="font-semibold text-white">
                                        {cartItems.reduce(
                                            (sum, item) => sum + item.quantity,
                                            0,
                                        )}{" "}
                                        Pcs
                                    </span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Biaya Pengiriman</span>
                                    <span className="text-green-400 font-medium">
                                        Gratis
                                    </span>
                                </div>
                                <div className="border-t border-gray-950 my-2 pt-3 flex justify-between items-baseline">
                                    <span className="text-base font-bold">
                                        Total Harga
                                    </span>
                                    {/* HARGA SEMENTARA MENYESUAIKAN ITEM PERTAMA (EFEK LIMITASI BACKEND) */}
                                    <span className="text-xl font-black text-indigo-400">
                                        {formatRupiah(totalPrice)}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full h-[48px] bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-full shadow-lg shadow-indigo-600/10 transition-all active:scale-95 flex items-center justify-center"
                            >
                                Lanjut ke Pembayaran
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
