import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, NavLink } from "react-router-dom";
import { useDecodedToken, logout } from "../_services/auth";

export default function AdminLayout() {
    const navigate = useNavigate();
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    // ==========================================
    // 1. ROUTE PROTECTION (Proteksi Keamanan Akses & Otorisasi)
    // ==========================================
    const token = localStorage.getItem("token");
    const decodedData = useDecodedToken(token);

    const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {
        name: "Admin",
        email: "admin@domain.com",
    };

    useEffect(() => {
        if (!token || !decodedData || !decodedData.success) {
            navigate("/login");
            return;
        }

        const role = decodedData.data?.role;
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
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Gagal logout:", error);
            localStorage.removeItem("token");
            localStorage.removeItem("userInfo");
            navigate("/login");
        }
    };

    return (
        <>
            {/* BACKGROUND UTAMA: Mengunci seluruh layout ke warna gelap pekat premium #090d16 */}
            <div className="antialiased bg-[#090d16] min-h-screen text-gray-300 font-sans relative">
                
                {/* Aksen Pendaran Cahaya Neon Abstrak di Latar Belakang Dashboard */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none"></div>
                <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[150px] pointer-events-none"></div>

                {/* NAVBAR ATAS */}
                <nav className="bg-[#090d16]/80 backdrop-blur-md border-b border-gray-800/40 px-4 py-3 fixed left-0 right-0 top-0 z-50">
                    <div className="flex flex-wrap justify-between items-center max-w-screen-2xl mx-auto">
                        <div className="flex justify-start items-center">
                            {/* Tombol Hamburger Menu Mobile */}
                            <button
                                data-drawer-target="drawer-navigation"
                                data-drawer-toggle="drawer-navigation"
                                className="p-2 mr-2 text-gray-400 rounded-xl md:hidden hover:text-white hover:bg-gray-900 focus:outline-none transition-colors"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                            
                            {/* BRAND LOGO DENGAN AKSEN GRADASI */}
                            <Link to="/admin" className="flex items-center justify-between mr-4 gap-2.5 group">
                                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-1.5 rounded-lg shadow-md transition-transform group-hover:scale-105">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <span className="self-center text-lg font-black tracking-tight whitespace-nowrap text-white">
                                    Book<span className="text-indigo-400">Sales</span> <span className="text-xs font-medium text-gray-500 bg-gray-900 border border-gray-800 px-2 py-0.5 rounded-full ml-1">Admin</span>
                                </span>
                            </Link>
                        </div>

                        {/* BAGIAN FOTO PROFIL & DROPDOWN ADMIN */}
                        <div className="flex items-center lg:order-2 relative">
                            <button
                                type="button"
                                className="flex mx-3 text-sm rounded-full focus:ring-4 focus:ring-indigo-950 transition-all border-2 border-transparent hover:border-indigo-500/40"
                                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                            >
                                <span className="sr-only">Open user menu</span>
                                <img
                                    className="w-8 h-8 rounded-full object-cover"
                                    src="https://ui-avatars.com/api/?name=Admin&background=6366f1&color=fff&bold=true"
                                    alt="user photo"
                                />
                            </button>

                            {/* DROPDOWN MENU KAPSUL GELAP */}
                            {isUserDropdownOpen && (
                                <div className="absolute right-0 top-10 z-50 my-2 w-56 list-none bg-gray-900 border border-gray-800 shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 transform origin-top-right">
                                    <div className="py-3 px-5 bg-gray-950/40 border-b border-gray-800/60">
                                        <span className="block text-sm font-bold text-white truncate">
                                            {userInfo.name}
                                        </span>
                                        <span className="block text-xs text-gray-400 truncate mt-0.5">
                                            {userInfo.email}
                                        </span>
                                    </div>
                                    <ul className="py-1">
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left flex items-center gap-2 py-2.5 px-5 text-xs font-bold text-red-400 hover:bg-red-950/20 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                Keluar Sesi Admin
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>

                {/* SIDEBAR PANEL KIRI */}
                <aside
                    className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-gray-950/40 backdrop-blur-sm border-r border-gray-900/60 md:translate-x-0"
                    id="drawer-navigation"
                >
                    <div className="overflow-y-auto py-5 px-4 h-full">
                        {/* GRUP MENU UTAMA */}
                        <ul className="space-y-1.5 font-medium text-sm">
                            <li>
                                <NavLink
                                    to="/admin"
                                    end
                                    className={({ isActive }) =>
                                        `flex items-center p-3 rounded-xl transition group ${
                                            isActive
                                                ? "text-white bg-indigo-600/20 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                                                : "text-gray-400 hover:text-white hover:bg-gray-900/60 border border-transparent"
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <svg className={`w-5 h-5 transition ${isActive ? "text-indigo-400" : "text-gray-500 group-hover:text-indigo-400"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                            </svg>
                                            <span className="ml-3 font-semibold text-xs uppercase tracking-wider">Overview</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/admin/users"
                                    className={({ isActive }) =>
                                        `flex items-center p-3 rounded-xl transition group ${
                                            isActive
                                                ? "text-white bg-indigo-600/20 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                                                : "text-gray-400 hover:text-white hover:bg-gray-900/60 border border-transparent"
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <svg className={`w-5 h-5 transition ${isActive ? "text-indigo-400" : "text-gray-500 group-hover:text-indigo-400"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                                            </svg>
                                            <span className="ml-3 font-semibold text-xs uppercase tracking-wider">Users</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/admin/authors"
                                    className={({ isActive }) =>
                                        `flex items-center p-3 rounded-xl transition group ${
                                            isActive
                                                ? "text-white bg-indigo-600/20 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                                                : "text-gray-400 hover:text-white hover:bg-gray-900/60 border border-transparent"
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <svg className={`w-5 h-5 transition ${isActive ? "text-indigo-400" : "text-gray-500 group-hover:text-indigo-400"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                                            </svg>
                                            <span className="ml-3 font-semibold text-xs uppercase tracking-wider">Authors</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/admin/genres"
                                    className={({ isActive }) =>
                                        `flex items-center p-3 rounded-xl transition group ${
                                            isActive
                                                ? "text-white bg-indigo-600/20 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                                                : "text-gray-400 hover:text-white hover:bg-gray-900/60 border border-transparent"
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <svg className={`w-5 h-5 transition ${isActive ? "text-indigo-400" : "text-gray-500 group-hover:text-indigo-400"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 011.414-1.414L10 14.586l6.293-6.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                                <path fillRule="evenodd" d="M17.707 4.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 011.414-1.414L10 9.586l6.293-6.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                            <span className="ml-3 font-semibold text-xs uppercase tracking-wider">Genres</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/admin/contacts"
                                    className={({ isActive }) =>
                                        `flex items-center p-3 rounded-xl transition group ${
                                            isActive
                                                ? "text-white bg-indigo-600/20 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                                                : "text-gray-400 hover:text-white hover:bg-gray-900/60 border border-transparent"
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <svg className={`w-5 h-5 transition ${isActive ? "text-indigo-400" : "text-gray-500 group-hover:text-indigo-400"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" clipRule="evenodd"></path>
                                            </svg>
                                            <span className="ml-3 font-semibold text-xs uppercase tracking-wider">Contacts</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        </ul>
                        
                        {/* PEMBATAS GRUP MENU DATA PRODUK */}
                        <ul className="pt-5 mt-5 space-y-1.5 border-t border-gray-900">
                            <li>
                                <NavLink
                                    to="/admin/books"
                                    className={({ isActive }) =>
                                        `flex items-center p-3 rounded-xl transition group ${
                                            isActive
                                                ? "text-white bg-indigo-600/20 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                                                : "text-gray-400 hover:text-white hover:bg-gray-900/60 border border-transparent"
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <svg className={`w-5 h-5 transition ${isActive ? "text-indigo-400" : "text-gray-500 group-hover:text-indigo-400"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path>
                                            </svg>
                                            <span className="ml-3 font-semibold text-xs uppercase tracking-wider">Books</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/admin/transactions"
                                    className={({ isActive }) =>
                                        `flex items-center p-3 rounded-xl transition group ${
                                            isActive
                                                ? "text-white bg-indigo-600/20 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                                                : "text-gray-400 hover:text-white hover:bg-gray-900/60 border border-transparent"
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <svg className={`w-5 h-5 transition ${isActive ? "text-indigo-400" : "text-gray-500 group-hover:text-indigo-400"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h3a1 1 0 100-2H9z"></path>
                                            </svg>
                                            <span className="ml-3 font-semibold text-xs uppercase tracking-wider">Transactions</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </aside>

                {/* AREA UTAMA OUTLET KONTEN */}
                <main className="p-4 md:ml-64 min-h-screen pt-24 relative z-10">
                    <div className="bg-gray-900/40 backdrop-blur-sm rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-800/60 min-h-[calc(100vh-120px)] p-6 md:p-8">
                        <Outlet />
                    </div>
                </main>

            </div>
        </>
    );
}