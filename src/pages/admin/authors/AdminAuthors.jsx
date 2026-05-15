import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getAuthors,
    deleteAuthor,
    updateAuthor,
} from "../../../_services/authors";

export default function AdminAuthors() {
    const [authors, setAuthors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // STATE UNTUK MODAL EDIT
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentAuthor, setCurrentAuthor] = useState({
        id: "",
        name: "",
        bio: "",
    });

    useEffect(() => {
        fetchAuthors();
    }, []);

    const fetchAuthors = async () => {
        try {
            setIsLoading(true);
            const res = await getAuthors();
            const authorsArray = Array.isArray(res) ? res : res?.data || [];
            setAuthors(authorsArray);
        } catch (error) {
            console.error("Error fetching authors:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const isConfirm = window.confirm("Yakin mau hapus author ini?");
        if (isConfirm) {
            try {
                await deleteAuthor(id);
                setAuthors(authors.filter((a) => a.id !== id));
            } catch (error) {
                console.error("Gagal menghapus author", error);
                alert("Gagal menghapus! Pastikan author tidak dipakai di tabel buku.");
            }
        }
    };

    const openEditModal = (author) => {
        setCurrentAuthor({
            id: author.id,
            name: author.name,
            bio: author.bio || "",
        });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateAuthor(currentAuthor.id, {
                name: currentAuthor.name,
                bio: currentAuthor.bio,
            });

            setAuthors(
                authors.map((a) =>
                    a.id === currentAuthor.id
                        ? { ...a, name: currentAuthor.name, bio: currentAuthor.bio }
                        : a
                ),
            );

            closeEditModal();
        } catch (error) {
            console.error("Gagal update author", error);
            alert("Gagal update data!");
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 relative font-sans">
            <div className="mx-auto max-w-screen-xl">
                <div className="bg-white dark:bg-gray-800 relative shadow-sm sm:rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    
                    {/* Header Admin */}
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-6 border-b border-gray-50 dark:border-gray-700">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                                Management <span className="text-[#006d7e]">Authors</span>
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola data penulis buku kamu di sini.</p>
                        </div>
                        <div className="w-full md:w-auto flex justify-end">
                            <Link
                                to="/admin/authors/create"
                                className="flex items-center justify-center text-white bg-[#006d7e] hover:bg-[#005a68] focus:ring-4 focus:ring-[#006d7e]/30 font-bold rounded-full text-sm px-6 py-2.5 transition-all duration-300 shadow-lg shadow-[#006d7e]/20"
                            >
                                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                Add Author
                            </Link>
                        </div>
                    </div>

                    {/* Tabel Authors */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-400 uppercase bg-gray-50/50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-4 font-bold">ID</th>
                                    <th scope="col" className="px-6 py-4 font-bold">Author Name</th>
                                    <th scope="col" className="px-6 py-4 text-right font-bold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="3" className="text-center py-20">
                                            <div className="flex justify-center items-center">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#006d7e]"></div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : authors.length > 0 ? (
                                    authors.map((author) => (
                                        <tr key={author.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-400">#{author.id}</td>
                                            <th scope="row" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                                {author.name}
                                            </th>
                                            <td className="px-6 py-4 flex justify-end gap-3">
                                                <button
                                                    onClick={() => openEditModal(author)}
                                                    className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
                                                    title="Edit Author"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(author.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete Author"
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
                                        <td colSpan="3" className="text-center py-20 text-gray-400 italic">No authors found in the system.</td>
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
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={closeEditModal}></div>
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-md p-8 relative z-10 border border-gray-100 dark:border-gray-700 animate-in fade-in zoom-in duration-300">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                                Edit <span className="text-[#006d7e]">Author</span>
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">Perbarui informasi penulis di bawah ini.</p>
                        </div>
                        
                        <form onSubmit={handleUpdateSubmit} className="space-y-5">
                            <div>
                                <label className="block mb-2 text-xs font-bold uppercase tracking-widest text-gray-400">Author Name</label>
                                <input
                                    type="text"
                                    value={currentAuthor.name}
                                    onChange={(e) => setCurrentAuthor({ ...currentAuthor, name: e.target.value })}
                                    className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl block w-full p-3 focus:ring-2 focus:ring-[#006d7e] focus:border-transparent outline-none transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Masukkan nama penulis..."
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-xs font-bold uppercase tracking-widest text-gray-400">Bio / Description</label>
                                <textarea
                                    value={currentAuthor.bio}
                                    onChange={(e) => setCurrentAuthor({ ...currentAuthor, bio: e.target.value })}
                                    className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl block w-full p-3 focus:ring-2 focus:ring-[#006d7e] focus:border-transparent outline-none transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    rows="4"
                                    placeholder="Tulis biografi singkat..."
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