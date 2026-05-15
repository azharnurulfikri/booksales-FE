import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  // Helper untuk cek link aktif agar styling lebih dinamis
  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed w-full z-50 top-0 left-0">
      {/* 
          PENJELASAN PERUBAHAN:
          - sticky/fixed top: Biar navbar melayang saat di-scroll.
          - backdrop-blur: Memberikan efek kaca (glassmorphism).
          - border-b: Garis tipis transparan di bawah agar terlihat depth-nya.
      */}
      <nav className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 px-4 lg:px-6 py-3">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          
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

          <div className="flex items-center lg:order-2">
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
            
            <button
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>

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
                    {/* Garis bawah animasi saat hover */}
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