import { useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";

export default function AdminLayout() {
  // 1. State untuk mengontrol dropdown profil (buka/tutup)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // 2. Fungsi untuk Logout
  const handleLogout = (e) => {
    e.preventDefault();
    // Hapus data autentikasi (token) dari localStorage
    localStorage.removeItem("token");
    // Arahkan user kembali ke halaman login
    navigate("/login");
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
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                </svg>
              </button>
              <Link to="/admin" className="flex items-center justify-between mr-4">
                <img src="https://flowbite.s3.amazonaws.com/logo.svg" className="mr-3 h-8" alt="Flowbite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
              </Link>
            </div>

            <div className="flex items-center lg:order-2 relative">
              {/* Tombol Foto Profil */}
              <button
                type="button"
                className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                  alt="user photo"
                />
              </button>

              {/* DROPDOWN USER (Muncul jika state true) */}
              {isUserDropdownOpen && (
                <div className="absolute right-0 top-10 z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl">
                  <div className="py-3 px-4">
                    <span className="block text-sm font-semibold text-gray-900 dark:text-white">Neil Sims</span>
                    <span className="block text-sm text-gray-900 truncate dark:text-white">name@flowbite.com</span>
                  </div>
                  <ul className="py-1 text-gray-700 dark:text-gray-300">
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
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
                <Link to="/admin" className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <span className="ml-3">Overview</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/users" className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <span className="ml-3">Users</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/authors" className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <span className="ml-3">Authors</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/genres" className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <span className="ml-3">Genres</span>
                </Link>
              </li>
            </ul>
            <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
              <li>
                <Link to="/admin/books" className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <span className="ml-3">Books</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/transactions" className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
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