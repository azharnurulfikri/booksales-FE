import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGenre } from "../../../_services/books"; 

export default function GenreCreate() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState(""); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { 
                name: name,
                description: description 
            };
            
            await createGenre(payload); 
            navigate("/admin/genres"); 
        } catch (error) {
            console.error("Error creating genre:", error);
            alert("Failed to create genre. Pastikan form terisi semua.");
        }
    };

    const handleReset = () => {
        setName("");
        setDescription(""); 
    };

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Create New Genre
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                        
                        {/* Input Nama Genre */}
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Genre Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                                placeholder="e.g., Sci-Fi, Psychological Thriller..."
                                required
                            />
                        </div>
                        
                        {/* Input Deskripsi */}
                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="4"
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                                placeholder="Tulis deskripsi genre di sini..."
                                required
                            ></textarea>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <button type="submit" className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                            Save Genre
                        </button>
                        <button type="button" onClick={handleReset} className="text-gray-600 border border-gray-600 hover:bg-gray-600 hover:text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-600">
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}