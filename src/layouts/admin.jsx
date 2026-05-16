import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
// Import fungsi logout yang udah dibenerin
import { useDecodedToken, logout } from "../_services/auth";

export default function AdminLayout() {
    const navigate = useNavigate();

    // State untuk mengontrol visibilitas dropdown profil antarmuka
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    
    // ==========================================
    // 1. ROUTE PROTECTION (Proteksi Keamanan Akses & Otorisasi)
    // ==========================================
    const token = localStorage.getItem("token");
    const decodedData = useDecodedToken(token);

    // Ambil data user dari localStorage buat ditampilin di profil (opsional fallback kalau kosong)
    const userInfo = JSON.parse(localStorage.getItem("userInfo")) || { name: "Admin", email: "admin@domain.com" };

    useEffect(() => {
        // Tahap 1: Autentikasi (Apakah pengguna sudah login?)
        if (!token || !decodedData || !decodedData.success) {
            navigate("/login");
            return; 
        }

        // Tahap 2: Otorisasi (Apakah pengguna ini adalah admin?)
        const role = decodedData.data?.role;

        // Jika role bukan admin atau tidak memiliki role sama sekali
        if (role !== "admin" || !role) {
            navigate("/");
        }
    }, [token, decodedData, navigate]);

    // ==========================================
    // 2. LOGOUT HANDLER (Fungsi Keluar Sesi ke Backend)
    // ==========================================
    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            // Tembak API backend buat hapus token di server
            await logout(); 
            
            // Kalau sukses, lempar ke halaman login
            navigate("/login");
        } catch (error) {
            console.error("Gagal logout:", error);
            // Fallback: Kalau server error, tetep bersihin storage lokal dan paksa keluar
            localStorage.removeItem("token");
            localStorage.removeItem("userInfo");
            navigate("/login");
        }
    };

    return (
        <>
            <div className="antialiased bg-gray-50 dark:bg-gray-900">
                {/* NAVBAR */}
                <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="flex justify-start items-center">
                            <button
                                data-drawer-target="drawer-navigation"
                                data-drawer-toggle="drawer-navigation"
                                className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                            <Link
                                to="/admin"
                                className="flex items-center justify-between mr-4"
                            >
                                <img
                                    src="https://flowbite.s3.amazonaws.com/logo.svg"
                                    className="mr-3 h-8"
                                    alt="Flowbite Logo"
                                />
                                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                                    Flowbite
                                </span>
                            </Link>
                        </div>

                        <div className="flex items-center lg:order-2 relative">
                            {/* Tombol Foto Profil */}
                            <button
                                type="button"
                                className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                onClick={() =>
                                    setIsUserDropdownOpen(!isUserDropdownOpen)
                                }
                            >
                                <span className="sr-only">Open user menu</span>
                                <img
                                    className="w-8 h-8 rounded-full object-cover"
                                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                                    alt="user photo"
                                />
                            </button>

                            {/* DROPDOWN USER (Dinamic Data) */}
                            {isUserDropdownOpen && (
                                <div className="absolute right-0 top-10 z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl">
                                    <div className="py-3 px-4">
                                        <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                                            {userInfo.name}
                                        </span>
                                        <span className="block text-sm text-gray-900 truncate dark:text-white">
                                            {userInfo.email}
                                        </span>
                                    </div>
                                    <ul className="py-1 text-gray-700 dark:text-gray-300">
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors"
                                            >
                                                Sign out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>

                {/* SIDEBAR */}
                <aside
                    className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
                    id="drawer-navigation"
                >
                    <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to="/admin"
                                    className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <svg
                                        className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                    </svg>
                                    <span className="ml-3">Overview</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/users"
                                    className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <span className="ml-3">Users</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/authors"
                                    className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <span className="ml-3">Authors</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/genres"
                                    className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <span className="ml-3">Genres</span>
                                </Link>
                            </li>
                        </ul>
                        <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
                            <li>
                                <Link
                                    to="/admin/books"
                                    className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <span className="ml-3">Books</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/transactions"
                                    className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <span className="ml-3">Transaction</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </aside>

                {/* MAIN CONTENT AREA */}
                <main className="p-4 md:ml-64 h-auto pt-20">
                    <div className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-auto px-4 pt-4 pb-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    );
}