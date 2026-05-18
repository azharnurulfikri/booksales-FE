import { useEffect, useState } from "react";
import { createBook, getGenres } from "../../../_services/books";
import { getAuthors } from "../../../_services/authors";
import { useNavigate } from "react-router-dom";

export default function BookCreate() {
    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);
    
    const [formData, setFormData] = useState({  //menyimpan input form
        title: "",
        price: 0,
        stock: 0,
        genre_id: "", 
        author_id: "",
        cover_photo: null,
        description: "",
    });

    const navigate = useNavigate();

    useEffect(() => {  //mengambil data genre dan author dari backend API saat halaman pertama kali dibuka.
        const fetchData = async () => {
            try {
                const [genresData, authorsData] = await Promise.all([ //supaya request genre dan author berjalan bersamaan agar lebih cepat.
                    getGenres(),
                    getAuthors(),
                ]);

                console.log("Cek Genre:", genresData);
                console.log("Cek Author:", authorsData);

                const finalGenres = Array.isArray(genresData) ? genresData : (genresData?.data || []);
                const finalAuthors = Array.isArray(authorsData) ? authorsData : (authorsData?.data || []);

                setGenres(finalGenres);
                setAuthors(finalAuthors);
                
            } catch (error) {
                console.error("Gagal mengambil data referensi:", error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {     //menangani perubahan input form.
        const { name, value, files } = e.target;

        if (name === "cover_photo") {
            setFormData({
                ...formData,
                cover_photo: files[0],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleReset = () => {
        setFormData({
            title: "",
            price: 0,
            stock: 0,
            genre_id: "",
            author_id: "",
            cover_photo: null,
            description: "",
        });
        
        const fileInput = document.getElementById("cover_photo");
        if (fileInput) fileInput.value = "";
    };

    const handelSubmit = async (e) => {
    e.preventDefault(); 

    try {
        const payload = new FormData(); 
        for (const key in formData) {
            if (formData[key] !== null) {
                payload.append(key, formData[key]);
            }
        }

        await createBook(payload);
        alert("Buku berhasil dibuat!"); 
        navigate("/admin/books");
    } catch(error) {
        console.log(error);
        alert("Gagal menambahkan buku, cek console!");
    }
}

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Create New Book
                </h2>
                
                <form onSubmit={handelSubmit}>
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
                                    <option key={genre.id} value={genre.id}>
                                        {genre.name}
                                    </option>
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
                                {/* Hapus defaultValue="" di tag select */}
                                <option value="" disabled>---Select Authors---</option>
                                {authors?.map((author) => (
                                    <option key={author.id} value={author.id}>
                                        {author.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="cover_photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Cover Photo
                            </label>
                            <input
                                type="file"
                                name="cover_photo"
                                id="cover_photo"
                                accept="image/*"
                                onChange={handleChange}
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-1 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 dark:file:bg-indigo-500 dark:hover:file:bg-indigo-400 file:cursor-pointer transition-all"
                                required
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
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
                            Create Book
                        </button>
                        
                        {/* [PERBAIKAN 6]: Menambahkan onClick={handleReset} */}
                        <button
                            type="button"
                            onClick={handleReset} 
                            className="text-gray-600 inline-flex items-center hover:text-white border border-gray-600 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-900"
                        >
                            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}