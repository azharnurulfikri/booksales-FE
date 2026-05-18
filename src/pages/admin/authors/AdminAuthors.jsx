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
        // Mengubah background section luar menjadi transparan murni karena penampung utamanya sudah di-handle AdminLayout
        <section className="p-0 relative font-sans">
            <div className="mx-auto w-full">
                {/* Tabel Kontainer: Dibersihkan dari warna bg-white kaku, berganti ke borderless transparan pekat */}
                <div className="bg-transparent relative overflow-hidden">
                    
                    {/* Header Bagian Atas Panel */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 pb-6 border-b border-gray-800/60">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                                Management <span className="text-indigo-400">Authors</span>
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">Kelola data penulis buku kamu di sini.</p>
                        </div>
                        <div className="w-full sm:w-auto flex justify-end">
                            {/* Tombol Add Author bermutasi ke gaya Capsule Indigo Glowing */}
                            <Link
                                to="/admin/authors/create"
                                className="flex items-center justify-center text-white bg-indigo-600 hover:bg-indigo-500 font-bold rounded-full text-xs px-5 py-3 transition-all duration-300 shadow-lg shadow-indigo-600/10 transform active:scale-95"
                            >
                                <svg className="h-4 w-4 mr-1.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                Add Author
                            </Link>
                        </div>
                    </div>

                    {/* Rangka Struktur Tabel */}
                    <div className="overflow-x-auto mt-4">
                        <table className="w-full text-sm text-left text-gray-400">
                            <thead className="text-xs text-gray-500 uppercase bg-gray-950/40 border-b border-gray-800/40">
                                <tr>
                                    <th scope="col" className="px-6 py-4 font-bold tracking-wider">ID</th>
                                    <th scope="col" className="px-6 py-4 font-bold tracking-wider">Author Name</th>
                                    <th scope="col" className="px-6 py-4 text-right font-bold tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800/40">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="3" className="text-center py-24">
                                            <div className="flex justify-center items-center">
                                                <div className="animate-spin rounded-full h-7 w-7 border-2 border-indigo-500 border-t-transparent"></div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : authors.length > 0 ? (
                                    authors.map((author) => (
                                        <tr key={author.id} className="hover:bg-gray-900/30 transition-colors duration-200">
                                            <td className="px-6 py-4.5 text-xs font-mono text-gray-600">#{author.id}</td>
                                            <th scope="row" className="px-6 py-4.5 font-bold text-gray-200 whitespace-nowrap">
                                                {author.name}
                                            </th>
                                            <td className="px-6 py-4.5 flex justify-end gap-2">
                                                {/* Tombol Aksi Edit */}
                                                <button
                                                    onClick={() => openEditModal(author)}
                                                    className="p-2 text-amber-400 bg-amber-500/5 border border-amber-500/10 hover:bg-amber-500/20 hover:border-amber-500/30 rounded-xl transition-all"
                                                    title="Edit Author"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>
                                                {/* Tombol Aksi Delete */}
                                                <button
                                                    onClick={() => handleDelete(author.id)}
                                                    className="p-2 text-red-400 bg-red-500/5 border border-red-500/10 hover:bg-red-500/20 hover:border-red-500/30 rounded-xl transition-all"
                                                    title="Delete Author"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center py-24 text-gray-500 text-xs tracking-wide">
                                            No authors found in the database system.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* MODAL EDIT POP-UP (Injeksi Skema Glassmorphism Gelap) */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Lapisan Latar Belakang Buram Tembus Pandang */}
                    <div className="absolute inset-0 bg-gray-950/60 backdrop-blur-sm" onClick={closeEditModal}></div>
                    
                    {/* Kontainer Utama Box Modal */}
                    <div className="bg-gray-950/95 border border-gray-800/80 rounded-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.8)] w-full max-w-md p-8 relative z-10 animate-in fade-in zoom-in-95 duration-200 text-left">
                        <div className="text-center mb-8">
                            <span className="text-indigo-400 font-bold tracking-[0.25em] text-[10px] uppercase mb-2 block">
                                Modify Resource
                            </span>
                            <h3 className="text-2xl font-black text-white tracking-tight">
                                Edit <span className="text-indigo-400">Author</span>
                            </h3>
                            <div className="w-6 h-0.5 bg-indigo-500 mx-auto mt-2.5 rounded-full"></div>
                        </div>
                        
                        <form onSubmit={handleUpdateSubmit} className="space-y-5">
                            {/* Input Nama Penulis */}
                            <div>
                                <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">Author Name</label>
                                <input
                                    type="text"
                                    value={currentAuthor.name}
                                    onChange={(e) => setCurrentAuthor({ ...currentAuthor, name: e.target.value })}
                                    className="w-full px-4 py-2.5 text-sm text-white bg-gray-900/50 border border-gray-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:outline-none transition-all duration-300 placeholder-gray-700"
                                    placeholder="Masukkan nama penulis..."
                                    required
                                />
                            </div>
                            {/* Input Biografi Deskripsi */}
                            <div>
                                <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">Bio / Description</label>
                                <textarea
                                    value={currentAuthor.bio}
                                    onChange={(e) => setCurrentAuthor({ ...currentAuthor, bio: e.target.value })}
                                    className="w-full px-4 py-2.5 text-sm text-white bg-gray-900/50 border border-gray-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:outline-none transition-all duration-300 placeholder-gray-700 resize-none"
                                    rows="4"
                                    placeholder="Tulis biografi singkat..."
                                    required
                                />
                            </div>
                            
                            {/* Tombol Batalkan & Konfirmasi Aksi */}
                            <div className="flex gap-3 pt-3">
                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    className="w-full h-[44px] text-gray-400 bg-gray-900/40 border border-gray-800/80 hover:text-white rounded-full text-xs font-bold transition-all flex items-center justify-center"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="w-full h-[44px] text-white bg-indigo-600 hover:bg-indigo-500 font-bold rounded-full text-xs shadow-lg shadow-indigo-600/10 transition-all transform active:scale-95 flex items-center justify-center"
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