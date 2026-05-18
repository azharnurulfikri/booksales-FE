import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    // State untuk fungsionalitas fitur pencarian buku
    const [searchQuery, setSearchQuery] = useState("");

    // State untuk dropdown profil dan menu mobile
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // State lokal untuk menghitung total item di keranjang (Antisipasi awal menggunakan localStorage)
    const [cartCount, setCartCount] = useState(0);

    // Cek apakah user sudah login
    const token = localStorage.getItem("token");

    // Ambil data user dari localStorage
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    // Efek untuk membaca jumlah item di keranjang saat komponen dimuat
    useEffect(() => {
        // Logika awal membaca data dari local storage (bisa diganti fetching API Laravel /carts/count nantinya)
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalItems = savedCart.reduce(
            (sum, item) => sum + item.quantity,
            0,
        );
        setCartCount(totalItems);

        // Menambahkan listener agar jika ada perubahan cart di halaman lain, navbar langsung update
        const handleCartUpdate = () => {
            const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
            setCartCount(
                updatedCart.reduce((sum, item) => sum + item.quantity, 0),
            );
        };
        window.addEventListener("storage", handleCartUpdate);
        window.addEventListener("cartUpdated", handleCartUpdate);

        return () => {
            window.removeEventListener("storage", handleCartUpdate);
            window.removeEventListener("cartUpdated", handleCartUpdate);
        };
    }, []);

    // Helper untuk cek link aktif
    const isActive = (path) => location.pathname === path;

    // Fungsi Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("cart"); // Bersihkan keranjang saat logout jika memakai localstorage
        setIsDropdownOpen(false);
        navigate("/login");
    };

    // Fungsi Handler saat user menekan ENTER di kolom pencarian
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            navigate("/books");
        }
    };

    // Daftar Menu
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Buku Terlaris", path: "/books" },
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <header className="fixed w-full z-50 top-0 left-0">
            <nav className="bg-[#090d16]/70 backdrop-blur-md border-b border-gray-800/40 px-4 lg:px-6 py-3.5 transition-all duration-300">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    {/* LOGO */}
                    <Link to="/" className="flex items-center group gap-2.5">
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-2 rounded-xl shadow-md transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                        </div>
                        <span className="self-center text-xl font-black tracking-tight whitespace-nowrap text-white">
                            Book<span className="text-indigo-400">Sales</span>
                        </span>
                    </Link>

                    {/* BAGIAN KANAN: AUTH BUTTONS / USER PROFILE / CART */}
                    <div className="flex items-center lg:order-2 relative gap-3.5">
                        {/* IKON KERANJANG BELANJA (Hanya muncul jika user sudah login) */}
                        {token && (
                            <Link
                                to="/cart"
                                className="relative p-2 text-gray-400 hover:text-white bg-gray-900/40 border border-gray-800/60 hover:border-gray-700 rounded-full transition-all duration-300 group shadow-md"
                            >
                                <svg
                                    className="w-5 h-5 transform group-hover:scale-105 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>

                                {/* Badge angka HANYA muncul jika isi keranjang lebih dari 0 */}
                                {cartCount > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border border-[#090d16] shadow-md">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        )}

                        {token ? (
                            // JIKA SUDAH LOGIN: Tampilkan Foto Profil & Dropdown
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsDropdownOpen(!isDropdownOpen)
                                    }
                                    className="flex text-sm rounded-full focus:ring-4 focus:ring-indigo-950 transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-indigo-500/50"
                                >
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                    <img
                                        className="w-9 h-9 rounded-full object-cover"
                                        src="https://ui-avatars.com/api/?name=User&background=6366f1&color=fff&bold=true"
                                        alt="user photo"
                                    />
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 top-12 z-50 my-2 w-56 list-none bg-gray-900 border border-gray-800 shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 transform origin-top-right">
                                        <div className="py-4 px-5 bg-gray-950/40 border-b border-gray-800/60">
                                            <span className="block text-sm font-bold text-white truncate">
                                                Hai, {userInfo?.name || "User"}!
                                            </span>
                                            <span className="block text-xs text-gray-400 truncate mt-0.5">
                                                {userInfo?.email ||
                                                    "user@booksales.com"}
                                            </span>
                                        </div>
                                        <ul className="py-1.5">
                                            <li>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full text-left flex items-center gap-2.5 py-3 px-5 text-sm font-semibold text-gray-300 hover:bg-red-950/30 hover:text-red-400 transition-colors"
                                                >
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                        />
                                                    </svg>
                                                    Keluar Sesi
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) : (
                            // JIKA BELUM LOGIN: Tampilkan Masuk & Bergabung
                            <>
                                <Link
                                    to="/login"
                                    className="hidden sm:inline-block text-gray-300 hover:text-white font-semibold text-sm px-4 py-2 transition-colors duration-200"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    to="/register"
                                    className="text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 font-bold rounded-full text-sm px-5 py-2.5 transition-all duration-300 transform active:scale-95"
                                >
                                    Join Now
                                </Link>
                            </>
                        )}

                        <button
                            type="button"
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            className="inline-flex items-center p-2 text-sm text-gray-400 rounded-xl lg:hidden hover:bg-gray-800 focus:outline-none transition-colors"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                ) : (
                                    <path
                                        fillRule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clipRule="evenodd"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* SEARCH BAR INPUT */}
                    <div className="hidden lg:flex items-center flex-1 max-w-md mx-8 lg:order-1">
                        <form
                            onSubmit={handleSearchSubmit}
                            className="relative w-full"
                        >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </span>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search books by title..."
                                className="w-full py-2 pl-11 pr-4 text-xs text-gray-200 bg-gray-900/50 border border-gray-800/80 rounded-full focus:outline-none focus:border-indigo-500/50 focus:bg-gray-900/90 transition duration-300 placeholder-gray-600"
                            />
                        </form>
                    </div>

                    {/* DAFTAR MENU TENGAH */}
                    <div
                        className={`${isMobileMenuOpen ? "block" : "hidden"} justify-between items-center w-full lg:flex lg:w-auto lg:order-1 mt-4 lg:mt-0 transition-all duration-300 ease-in-out`}
                    >
                        <ul className="flex flex-col font-medium lg:flex-row lg:space-x-8 bg-gray-950/80 lg:bg-transparent rounded-2xl lg:rounded-none p-4 lg:p-0 border border-gray-800 lg:border-none gap-1 lg:gap-0">
                            {navLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                        className={`block py-2.5 px-4 lg:p-0 rounded-xl lg:rounded-none transition-all duration-300 relative group font-medium text-sm ${
                                            isActive(link.path)
                                                ? "text-white bg-indigo-600/20 lg:bg-transparent font-bold"
                                                : "text-gray-400 hover:text-white hover:bg-gray-900 lg:hover:bg-transparent"
                                        }`}
                                    >
                                        {link.name}
                                        <span
                                            className={`hidden lg:block absolute -bottom-1.5 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full rounded-full ${isActive(link.path) ? "w-full" : ""}`}
                                        ></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
