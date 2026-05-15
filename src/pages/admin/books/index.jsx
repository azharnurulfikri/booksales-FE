import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteBook, getbooks, getGenres } from "../../../_services/books";
import { getAuthors } from "../../../_services/authors";

export default function AdminBooks() {
    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [resBooks, resGenres, resAuthors] = await Promise.all([
                    getbooks(),
                    getGenres(),
                    getAuthors(),
                ]);

                const booksArray = resBooks.data || resBooks;
                const genresArray = resGenres.data || resGenres;
                const authorsArray = resAuthors.data || resAuthors;

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
        const genre = genres.find((g) => g.id === id);
        return genre ? genre.name : "Uncategorized";
    };

    const getAuthorName = (id) => {
        const author = authors.find((a) => a.id === id);
        return author ? author.name : "Unknown Author";
    };

    const handleFormatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(number);
    };

    const handelDelete = async (id) => {
        const confirmDelete = window.confirm("Apakah anda yakin ingin menghapus buku ini?");
        if (confirmDelete) {
            try {
                await deleteBook(id);
                setBooks(books.filter((book) => book.id !== id));
            } catch (error) {
                alert("Gagal menghapus buku");
                console.error(error);
            }
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 font-sans">
            <div className="mx-auto max-w-screen-xl">
                <div className="bg-white dark:bg-gray-800 relative shadow-sm sm:rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    
                    {/* Header: Title & Add Button */}
                    <div className="flex flex-col md:flex-row items-center justify-between p-6 border-b border-gray-50 dark:border-gray-700 space-y-4 md:space-y-0">
                        <div>
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                                Management <span className="text-[#006d7e]">Books</span>
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">Total koleksi: {books.length} buku tersedia.</p>
                        </div>
                        <Link
                            to="/admin/books/create"
                            className="flex items-center justify-center text-white bg-[#006d7e] hover:bg-[#005a68] focus:ring-4 focus:ring-[#006d7e]/30 font-bold rounded-full text-sm px-6 py-3 transition-all duration-300 shadow-lg shadow-[#006d7e]/20"
                        >
                            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Add New Book
                        </Link>
                    </div>

                    {/* Table Area */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-400 uppercase bg-gray-50/50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-4 font-bold">Book Info</th>
                                    <th className="px-6 py-4 font-bold">Category</th>
                                    <th className="px-6 py-4 font-bold">Stock</th>
                                    <th className="px-6 py-4 font-bold">Price</th>
                                    <th className="px-6 py-4 text-right font-bold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-20">
                                            <div className="flex flex-col items-center">
                                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#006d7e]"></div>
                                                <span className="mt-4 text-gray-400">Menyinkronkan data...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : books.length > 0 ? (
                                    books.map((book) => (
                                        <tr key={book.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                                            {/* Info Buku (Cover & Title) */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <img
                                                        src={`http://127.0.0.1:8000/storage/${book.cover_photo}`}
                                                        alt={book.title}
                                                        className="w-12 h-16 object-cover rounded-lg shadow-sm bg-gray-100"
                                                    />
                                                    <div>
                                                        <div className="text-base font-bold text-gray-900 dark:text-white line-clamp-1">
                                                            {book.title}
                                                        </div>
                                                        <div className="text-xs text-[#006d7e] font-medium uppercase tracking-wider mt-1">
                                                            {getAuthorName(book.author_id)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Genre */}
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] font-bold rounded-full uppercase tracking-tighter">
                                                    {getGenreName(book.genre_id)}
                                                </span>
                                            </td>

                                            {/* Stock */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${book.stock > 5 ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                                                    <span className="font-medium text-gray-700 dark:text-gray-300">{book.stock} Pcs</span>
                                                </div>
                                            </td>

                                            {/* Price */}
                                            <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                                                {handleFormatRupiah(book.price)}
                                            </td>

                                            {/* Actions (Tanpa Dropdown) */}
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        to={`/admin/books/edit/${book.id}`}
                                                        className="p-2 text-[#006d7e] hover:bg-[#006d7e]/10 rounded-lg transition-colors"
                                                        title="Edit Book"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                        </svg>
                                                    </Link>
                                                    <button
                                                        onClick={() => handelDelete(book.id)}
                                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete Book"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-20 text-gray-400 italic">Katalog buku kosong.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}