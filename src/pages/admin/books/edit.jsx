import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGenres, showBook, updateBook } from "../../../_services/books";
import { getAuthors } from "../../../_services/authors";

export default function BookEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);
    
    // State tambahan untuk menyimpan URL cover lama dari backend buat dipake di preview
    const [oldCoverUrl, setOldCoverUrl] = useState(""); 

    const [formData, setFormData] = useState({
        title: "",
        price: 0,
        stock: 0,
        genre_id: "",
        author_id: "",
        cover_photo: null,
        description: "", // deskripsi ada di sini
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [genresData, authorsData, bookData] = await Promise.all([
                    getGenres(),
                    getAuthors(),
                    showBook(id),
                ]);

                setGenres(genresData);
                setAuthors(authorsData);
                
                // Simpan URL cover lama ke state preview jika ada dari backend
                if (bookData.cover_photo) {
                    setOldCoverUrl(bookData.cover_photo); 
                }

                setFormData({
                    title: bookData.title,
                    price: bookData.price,
                    stock: bookData.stock,
                    genre_id: bookData.genre_id,
                    author_id: bookData.author_id,
                    cover_photo: null, // Biarkan null dulu karena input file tidak bisa diisi string URL
                    description: bookData.description || "", // FIX: Masukkan data deskripsi ke sini!
                });
            } catch (error) {
                console.error("Gagal mengambil data:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === "file" ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = new FormData();

            for (const key in formData) {
                // Kalau cover_photo kosong (user gak ganti gambar), jangan di-append ke FormData
                if (key === "cover_photo" && !(formData[key] instanceof File)) {
                    continue;
                }
                payload.append(key, formData[key]);
            }
            
            payload.append('_method', 'PUT');
            await updateBook(id, payload);

            navigate("/admin/books");
        } catch (error) {
            console.log(error);
            alert("Error updating book");
        }
    };

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Edit Book
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                        <div className="sm:col-span-2">
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                                placeholder="Book Title"
                                required
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Stok book
                            </label>
                            <input
                                type="number"
                                name="stock"
                                id="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                                placeholder="Product Stok"
                                required
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Price
                            </label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                                placeholder="Price Book"
                                required
                            />
                        </div>

                        {/* Dropdown Genre */}
                        <div className="w-full">
                            <label htmlFor="genre_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Genre
                            </label>
                            <select
                                id="genre_id"
                                name="genre_id"
                                value={formData.genre_id}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                                required
                            >
                                <option value="" disabled>---Select Genres---</option>
                                {genres?.map((genre) => (
                                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Dropdown Author */}
                        <div className="w-full">
                            <label htmlFor="author_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Author
                            </label>
                            <select
                                id="author_id"
                                name="author_id"
                                value={formData.author_id}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                                required
                            >
                                <option value="" disabled>---Select Authors---</option>
                                {authors?.map((author) => (
                                    <option key={author.id} value={author.id}>{author.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Input Cover Photo dengan Preview */}
                        <div className="sm:col-span-2">
                            <label htmlFor="cover_photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Cover Photo
                            </label>

                            {/* TAMPILKAN PREVIEW GAMBAR LAMA DI SINI */}
                            {oldCoverUrl && !formData.cover_photo && (
                                <div className="mb-3">
                                    <p className="text-xs text-gray-500 mb-1">Current Cover:</p>
                                    <img 
                                        src={oldCoverUrl} 
                                        alt="Current Book Cover" 
                                        className="w-32 h-auto rounded-lg border border-gray-300 dark:border-gray-600 object-cover"
                                    />
                                </div>
                            )}

                            <input
                                type="file"
                                name="cover_photo"
                                id="cover_photo"
                                accept="image/*"
                                onChange={handleChange}
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-1 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 dark:file:bg-indigo-500 dark:hover:file:bg-indigo-400 file:cursor-pointer transition-all"
                            />
                        </div>

                        {/* Textarea Description */}
                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description} // data binding berjalan karena nilainya diset di useEffect
                                onChange={handleChange}
                                rows="6"
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                                placeholder="Write a book description here..."
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            type="submit"
                            className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                        >
                            Update Book
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}