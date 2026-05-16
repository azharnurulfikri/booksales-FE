import { BrowserRouter, Route, Routes } from "react-router-dom";

// ==========================================
// 1. LAYOUT IMPORTS
// ==========================================
import PublicLayout from "./layouts/public";
import AdminLayout from "./layouts/admin";

// ==========================================
// 2. PUBLIC PAGE IMPORTS
// ==========================================
import Home from "./pages/index";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register"; // Pastikan ini mengarah ke file register yang baru kita buat
import Books from "./pages/public/books";
import ShowBook from "./pages/public/books/show";

// ==========================================
// 3. ADMIN PAGE IMPORTS
// ==========================================
import Dashboard from "./pages/admin";
import AdminBooks from "./pages/admin/books";
import BookCreate from "./pages/admin/books/create";
import BookEdit from "./pages/admin/books/edit";
import AdminGenres from "./pages/admin/genres/AdminGenres";
import GenreCreate from "./pages/admin/genres/GenreCreate";
import AdminAuthors from "./pages/admin/authors/AdminAuthors";
import AuthorCreate from "./pages/admin/authors/AuthorCreate";
import ProtectedRoute from "./componens/ProtectedRoute";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* ========================================== */}
                {/* PUBLIC ROUTES (Akses Pengunjung & Auth)    */}
                {/* ========================================== */}
                <Route element={<PublicLayout />}>
                    {/* Halaman Utama */}
                    <Route index element={<Home />} />

                    {/* Auth */}
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />

                    {/* Katalog Buku Publik */}
                    <Route path="books">
                        <Route index element={<Books />} />
                        <Route path="show/:id" element={<ShowBook />} />
                    </Route>
                </Route>

                {/* ========================================== */}
                {/* ADMIN ROUTES (Sekarang Terproteksi JWT)     */}
                {/* ========================================== */}
                <Route element={<ProtectedRoute />}>
                    <Route path="admin" element={<AdminLayout />}>
                        <Route index element={<Dashboard />} />

                        {/* Modul Buku */}
                        <Route path="books">
                            <Route index element={<AdminBooks />} />
                            <Route path="create" element={<BookCreate />} />
                            <Route path="edit/:id" element={<BookEdit />} />
                        </Route>

                        {/* Modul Genre */}
                        <Route path="genres">
                            <Route index element={<AdminGenres />} />
                            <Route path="create" element={<GenreCreate />} />
                        </Route>

                        {/* Modul Author */}
                        <Route path="authors">
                            <Route index element={<AdminAuthors />} />
                            <Route path="create" element={<AuthorCreate />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
