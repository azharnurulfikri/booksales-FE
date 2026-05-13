import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuthors } from "../../../_services/authors"; 

export default function AdminAuthors() {
    // State untuk menyimpan daftar author dan status loading
    const [authors, setAuthors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Mengambil data author dari API saat komponen di-render
    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                setIsLoading(true);
                const res = await getAuthors();
                // Memastikan data yang disimpan ke state selalu berbentuk array
                const authorsArray = Array.isArray(res) ? res : (res?.data || []);
                setAuthors(authorsArray);
            } catch (error) {
                console.error("Error fetching authors:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAuthors();
    }, []);

    return (
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                {/* Bagian Header dan Tombol Tambah Data */}
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div className="w-full md:w-1/2">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Authors List</h2>
                    </div>
                    <div className="w-full md:w-auto flex justify-end">
                        <Link
                            to="/admin/authors/create"
                            className="flex items-center justify-center text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
                        >
                            <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                            </svg>
                            Add Author
                        </Link>
                    </div>
                </div>

                {/* Tabel untuk menampilkan data author */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-4 py-3">ID</th>
                                <th scope="col" className="px-4 py-3">Author Name</th>
                                <th scope="col" className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan="3" className="text-center py-8">Loading data...</td></tr>
                            ) : authors.length > 0 ? (
                                authors.map((author, index) => (
                                    <tr key={author.id || index} className="border-b dark:border-gray-700">
                                        <td className="px-4 py-3">{author.id}</td>
                                        <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {author.name}
                                        </th>
                                        <td className="px-4 py-3 text-right">
                                            <span className="text-gray-400 italic text-xs">-</span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="3" className="text-center py-8">No authors found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}