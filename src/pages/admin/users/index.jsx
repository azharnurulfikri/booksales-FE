import { useState, useEffect } from "react";
import { getUsers } from "../../../_services/users"; // Sesuaikan path-nya

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                
                // Debugging: pantau struktur asli API di inspect console browser kamu
                console.log("Struktur data API dari Laravel:", response);

                // SAFETY CHECK: Validasi bentuk data agar tidak memicu error .map is not a function
                if (Array.isArray(response)) {
                    setUsers(response);
                } else if (response && Array.isArray(response.data)) {
                    // Jika Laravel membungkusnya dalam properti 'data' (contoh: API Resource Collection)
                    setUsers(response.data);
                } else if (response && Array.isArray(response.users)) {
                    // Jika Laravel membungkusnya dalam properti 'users'
                    setUsers(response.users);
                } else {
                    console.error("API tidak mengembalikan Array, melainkan:", response);
                    setUsers([]); // Fallback aman ke array kosong supaya web tidak blank putih
                }
            } catch (error) {
                console.error("Gagal mengambil data user:", error);
                setUsers([]); // Fallback aman saat network error
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <section className="bg-white dark:bg-gray-900 p-3 sm:p-5">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    {/* Header Tabel */}
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 border-b dark:border-gray-700">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Registered Users
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Manajemen data user terdaftar di aplikasi
                            </p>
                        </div>
                    </div>

                    {/* Tabel Konten */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-3">No</th>
                                    <th scope="col" className="px-4 py-3">Nama</th>
                                    <th scope="col" className="px-4 py-3">Email</th>
                                    <th scope="col" className="px-4 py-3">Role</th>
                                    <th scope="col" className="px-4 py-3">Tanggal Daftar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4 text-gray-500">
                                            Loading data users...
                                        </td>
                                    </tr>
                                ) : users.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4 text-gray-500">
                                            Belum ada user yang terdaftar.
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user, index) => (
                                        <tr
                                            key={user.id}
                                            className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                        >
                                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                                                {user.name}
                                            </td>
                                            <td className="px-4 py-3">
                                                {user.email}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                        user.role === "admin"
                                                            ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                                                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                    }`}
                                                >
                                                    {user.role || "customer"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                {/* FIX: Sintaks penulisan instansiasi Date objek sudah diperbaiki */}
                                                {user.created_at ? new Date(user.created_at).toLocaleDateString("id-ID", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                }) : "-"}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}