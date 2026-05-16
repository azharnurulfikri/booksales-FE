import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // State untuk dropdown profil
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Cek apakah user sudah login (cek token)
  const token = localStorage.getItem("token");
  
  // Ambil data user dari localStorage 
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // Helper untuk cek link aktif
  const isActive = (path) => location.pathname === path;

  // Fungsi Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo"); // Hapus juga data user kalau ada
    setIsDropdownOpen(false); // Tutup dropdown
    navigate("/login"); // Lempar ke halaman login
  };

  return (
    <header className="fixed w-full z-50 top-0 left-0">
      <nav className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 px-4 lg:px-6 py-3">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center group">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-8 transition-transform duration-300 group-hover:scale-110"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-bold tracking-tight whitespace-nowrap dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
              Flowbite
            </span>
          </Link>

          {/* BAGIAN KANAN: AUTH BUTTONS / USER PROFILE */}
          <div className="flex items-center lg:order-2 relative">
            
            {/* --- KONDISIONAL RENDER DISINI --- */}
            {token ? (
              // JIKA SUDAH LOGIN: Tampilkan Foto Profil & Dropdown
              <>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-600 transition-transform hover:scale-105"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-9 h-9 rounded-full border-2 border-indigo-500"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                    alt="user photo"
                  />
                </button>

                {/* Menu Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 top-12 z-50 my-4 w-48 text-base list-none bg-white rounded-xl divide-y divide-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-700 dark:divide-gray-600">
                    <div className="py-3 px-4">
                      {/* Ganti dengan nama asli user kalau ada */}
                      <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                        Hai, User! 
                      </span>
                    </div>
                    <ul className="py-1 text-gray-700 dark:text-gray-300">
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-red-600 dark:text-red-400 font-medium transition-colors"
                        >
                          Keluar Sesi
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              // JIKA BELUM LOGIN: Tampilkan Masuk & Bergabung
              <>
                <Link
                  to="/login"
                  className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold text-sm px-4 lg:px-5 py-2 mr-2 transition-colors duration-200"
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  className="text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 focus:ring-4 focus:ring-indigo-300 font-bold rounded-full text-sm px-6 lg:px-7 py-2.5 transition-all duration-300 transform hover:-translate-y-0.5 dark:bg-indigo-600 dark:hover:bg-indigo-700"
                >
                  Bergabung
                </Link>
              </>
            )}
            {/* --- AKHIR KONDISIONAL RENDER --- */}

            {/* Tombol Hamburger Menu Mobile */}
            <button
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>

          {/* DAFTAR MENU TENGAH */}
          <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {[
                { name: "Home", path: "/" },
                { name: "Buku Terlaris", path: "/books" },
                { name: "Blog", path: "/blog" },
                { name: "Layanan", path: "/services" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`block py-2 pr-4 pl-3 transition-all duration-300 relative group ${
                      isActive(link.path) 
                        ? "text-indigo-600 dark:text-white" 
                        : "text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-white"
                    }`}
                  >
                    {link.name}
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full ${isActive(link.path) ? "w-full" : ""}`}></span>
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