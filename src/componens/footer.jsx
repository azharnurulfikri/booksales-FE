import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 pt-16 pb-8">
      {/* Efek Cahaya Halus di Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-20"></div>

      <div className="mx-auto max-w-screen-xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12 text-left">
          
          {/* Kolom Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-8"
                alt="Flowbite Logo"
              />
              <span className="self-center text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                Flowbite
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 max-w-xs mb-6">
              Membangun masa depan literasi digital dengan komponen UI modern dan koleksi buku terbaik untuk komunitas global.
            </p>
            {/* Social Media Icons (Opsional tapi bikin keren) */}
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'github', 'instagram'].map((social) => (
                <div key={social} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-indigo-500 transition-colors cursor-pointer">
                   {/* Placeholder icon */}
                   <span className="sr-only">{social}</span>
                   <div className="w-4 h-4 bg-current rounded-sm"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Grouping Links */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">Company</h3>
            <ul className="text-gray-500 dark:text-gray-400 space-y-3">
              <li><Link to="/about" className="hover:text-indigo-500 transition-colors">About</Link></li>
              <li><Link to="/premium" className="hover:text-indigo-500 transition-colors">Premium</Link></li>
              <li><Link to="/blog" className="hover:text-indigo-500 transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">Resources</h3>
            <ul className="text-gray-500 dark:text-gray-400 space-y-3">
              <li><Link to="/campaigns" className="hover:text-indigo-500 transition-colors">Campaigns</Link></li>
              <li><Link to="/affiliate" className="hover:text-indigo-500 transition-colors">Affiliate</Link></li>
              <li><Link to="/faqs" className="hover:text-indigo-500 transition-colors">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">Legal</h3>
            <ul className="text-gray-500 dark:text-gray-400 space-y-3">
              <li><Link to="/contact" className="hover:text-indigo-500 transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-indigo-500 transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-indigo-500 transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            © 2026 <Link to="/" className="hover:text-indigo-500">Azhar Nurul Fikri</Link>. Book store
          </span>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>Made with</span>
            <span className="text-red-500">❤️</span>
            <span>in Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}   