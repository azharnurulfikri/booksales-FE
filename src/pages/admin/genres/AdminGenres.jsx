import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGenres } from "../../../_services/books"; 

export default function AdminGenres() {
    // State untuk menyimpan daftar genre dan status loading
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Mengambil data genre dari API saat komponen pertama kali di-render
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                setIsLoading(true);
                const res = await getGenres();
                // Memastikan data yang disimpan ke state selalu berbentuk array
                const genresArray = Array.isArray(res) ? res : (res?.data || []);
                setGenres(genresArray);
            } catch (error) {
                console.error("Error fetching genres:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGenres();
    }, []);

    return (
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                {/* Bagian Header dan Tombol Tambah Data */}
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div className="w-full md:w-1/2">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Genres List</h2>
                    </div>
                    <div className="w-full md:w-auto flex justify-end">
                        <Link
                            to="/admin/genres/create"
                            className="flex items-center justify-center text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
                        >
                            <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                            </svg>
                            Add Genre
                        </Link>
                    </div>
                </div>

                {/* Tabel untuk menampilkan data genre */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-4 py-3">ID</th>
                                <th scope="col" className="px-4 py-3">Genre Name</th>
                                <th scope="col" className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan="3" className="text-center py-8">Loading data...</td></tr>
                            ) : genres.length > 0 ? (
                                genres.map((genre, index) => (
                                    <tr key={genre.id || index} className="border-b dark:border-gray-700">
                                        <td className="px-4 py-3">{genre.id}</td>
                                        <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {genre.name}
                                        </th>
                                        <td className="px-4 py-3 text-right">
                                            <span className="text-gray-400 italic text-xs">-</span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="3" className="text-center py-8">No genres found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}