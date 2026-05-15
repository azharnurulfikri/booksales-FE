import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGenres, deleteGenre, updateGenre } from "../../../_services/books";

export default function AdminGenres() {
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // STATE UNTUK MODAL EDIT
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentGenre, setCurrentGenre] = useState({
        id: "",
        name: "",
        description: "",
    });

    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchGenres = async () => {
        try {
            setIsLoading(true);
            const res = await getGenres();
            const genresArray = Array.isArray(res) ? res : res?.data || [];
            setGenres(genresArray);
        } catch (error) {
            console.error("Error fetching genres:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const isConfirm = window.confirm("Yakin mau hapus genre ini, dawg?");
        if (isConfirm) {
            try {
                await deleteGenre(id);
                setGenres(genres.filter((g) => g.id !== id));
            } catch (error) {
                console.error("Gagal menghapus genre", error);
                alert("Gagal menghapus! Pastikan genre tidak dipakai di tabel buku.");
            }
        }
    };

    const openEditModal = (genre) => {
        setCurrentGenre({
            id: genre.id,
            name: genre.name,
            description: genre.description || "",
        });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateGenre(currentGenre.id, {
                name: currentGenre.name,
                description: currentGenre.description,
            });

            setGenres(
                genres.map((g) =>
                    g.id === currentGenre.id
                        ? { ...g, name: currentGenre.name, description: currentGenre.description }
                        : g
                )
            );

            closeEditModal();
        } catch (error) {
            console.error("Gagal update genre", error);
            alert("Gagal update data!");
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 relative font-sans">
            <div className="mx-auto max-w-screen-xl">
                <div className="bg-white dark:bg-gray-800 relative shadow-sm sm:rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    
                    {/* Header Admin */}
                    <div className="flex flex-col md:flex-row items-center justify-between p-6 border-b border-gray-50 dark:border-gray-700 space-y-4 md:space-y-0">
                        <div>
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                                Management <span className="text-[#006d7e]">Genres</span>
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">Total kategori: {genres.length} genre aktif.</p>
                        </div>
                        <Link
                            to="/admin/genres/create"
                            className="flex items-center justify-center text-white bg-[#006d7e] hover:bg-[#005a68] focus:ring-4 focus:ring-[#006d7e]/30 font-bold rounded-full text-sm px-6 py-2.5 transition-all duration-300 shadow-lg shadow-[#006d7e]/20"
                        >
                            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Add New Genre
                        </Link>
                    </div>

                    {/* Tabel Genres */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-400 uppercase bg-gray-50/50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-4 font-bold">ID</th>
                                    <th className="px-6 py-4 font-bold">Genre Name</th>
                                    <th className="px-6 py-4 text-right font-bold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="3" className="text-center py-20">
                                            <div className="flex flex-col items-center">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#006d7e]"></div>
                                                <span className="mt-2 text-xs text-gray-400">Loading data...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : genres.length > 0 ? (
                                    genres.map((genre) => (
                                        <tr key={genre.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-400">#{genre.id}</td>
                                            <th scope="row" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                                {genre.name}
                                            </th>
                                            <td className="px-6 py-4 flex justify-end gap-3">
                                                <button
                                                    onClick={() => openEditModal(genre)}
                                                    className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
                                                    title="Edit Genre"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(genre.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete Genre"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center py-20 text-gray-400 italic">No genres found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* MODAL EDIT POP-UP */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop Blur */}
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={closeEditModal}></div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-md p-8 relative z-10 border border-gray-100 dark:border-gray-700 animate-in fade-in zoom-in duration-300">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                                Edit <span className="text-[#006d7e]">Genre</span>
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">Ubah kategori buku Anda.</p>
                        </div>
                        
                        <form onSubmit={handleUpdateSubmit} className="space-y-5">
                            <div>
                                <label className="block mb-2 text-xs font-bold uppercase tracking-widest text-gray-400">Genre Name</label>
                                <input
                                    type="text"
                                    value={currentGenre.name}
                                    onChange={(e) => setCurrentGenre({ ...currentGenre, name: e.target.value })}
                                    className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl block w-full p-3 focus:ring-2 focus:ring-[#006d7e] focus:border-transparent outline-none transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Nama genre..."
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-xs font-bold uppercase tracking-widest text-gray-400">Description</label>
                                <textarea
                                    value={currentGenre.description}
                                    onChange={(e) => setCurrentGenre({ ...currentGenre, description: e.target.value })}
                                    className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl block w-full p-3 focus:ring-2 focus:ring-[#006d7e] focus:border-transparent outline-none transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    rows="4"
                                    placeholder="Deskripsi singkat genre..."
                                    required
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    className="w-full text-gray-500 bg-gray-100 hover:bg-gray-200 font-bold rounded-full text-sm px-5 py-3 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-[#006d7e] hover:bg-[#005a68] font-bold rounded-full text-sm px-5 py-3 shadow-lg shadow-[#006d7e]/20 transition-all transform active:scale-95"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}