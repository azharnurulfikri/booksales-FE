import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getbooks, getGenres } from "../../../_services/books";
import { getAuthors } from "../../../_services/authors"; // Pastikan path ini benar

export default function AdminBooks() {
    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openDropdownId, setOpenDropdownId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // Pastikan nama fungsinya sesuai dengan yang ada di _services/authors
                const [resBooks, resGenres, resAuthors] = await Promise.all([
                    getbooks(),
                    getGenres(),
                    getAuthors(), 
                ]);

                const booksArray = resBooks.data || resBooks;
                const genresArray = resGenres.data || resGenres;
                const authorsArray = resAuthors.data || resAuthors; // Tambahan perbaikan

                setBooks(booksArray);
                setGenres(genresArray);
                setAuthors(authorsArray);
            } catch (error) {
                console.error("Gagal memuat data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const getGenreName = (id) => {
        if (!genres || genres.length === 0) return "Loading...";
        const genre = genres.find((g) => g.id === id);
        return genre ? genre.name : "Unknown Genre";
    };

    // Perbaikan nama fungsi agar tidak bentrok
    const getAuthorName = (id) => {
        if (!authors || authors.length === 0) return "Loading...";
        const author = authors.find((a) => a.id === id);
        return author ? author.name : "Unknown Author";
    };

    const toggelDropdown = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    {/* Header: Search & Add Product */}
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <div className="w-full md:w-1/2">
                            <form className="flex items-center">
                                <label htmlFor="simple-search" className="sr-only">Search</label>
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        id="simple-search"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                                        placeholder="Search books..."
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            <Link
                                to="/admin/books/create"
                                className="flex items-center justify-center text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
                            >
                                <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                </svg>
                                Add product
                            </Link>
                        </div>
                    </div>

                    {/* Table Area */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-3">Title</th>
                                    <th scope="col" className="px-4 py-3">Price</th>
                                    <th scope="col" className="px-4 py-3">Stock</th>
                                    <th scope="col" className="px-4 py-3">Cover</th>
                                    <th scope="col" className="px-4 py-3">Genre</th>
                                    <th scope="col" className="px-4 py-3">Author</th>
                                    <th scope="col" className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="7" className="text-center py-10">Memuat data...</td>
                                    </tr>
                                ) : books.length > 0 ? (
                                    books.map((book, index) => (
                                        <tr key={book.id || index} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {book.title || book.tittle}
                                            </th>
                                            <td className="px-4 py-3">
                                                Rp {Number(book.price).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-3">{book.stock}</td>
                                            <td className="px-4 py-3">
                                                <img
                                                    src={book.cover}
                                                    alt={book.title}
                                                    className="w-10 h-14 object-cover rounded shadow-sm"
                                                />
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                                                    {getGenreName(book.genre_id)}
                                                </span>
                                            </td>
                                            
                                            {/* Perbaikan Pemanggilan Fungsi Author */}
                                            <td className="px-4 py-3">{getAuthorName(book.author_id)}</td>
                                            
                                            <td className="px-4 py-3 flex items-center justify-end relative">
                                                <button
                                                    onClick={() => toggelDropdown(book.id)}
                                                    className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                                >
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                    </svg>
                                                </button>

                                                {/* Menu Dropdown */}
                                                {openDropdownId === book.id && (
                                                    <div className="absolute right-8 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200 text-left">
                                                            <li>
                                                                <Link 
                                                                    to={`/admin/books/edit/${book.id}`}
                                                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                                >
                                                                    Edit
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                        <div className="py-1">
                                                            <button className="w-full text-left block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600">
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center py-10 text-gray-500">Data buku kosong.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            Showing <span className="font-semibold text-gray-900 dark:text-white">1-{books.length}</span> of <span className="font-semibold text-gray-900 dark:text-white">{books.length}</span>
                        </span>
                    </nav>
                </div>
            </section>
        </>
    );
}