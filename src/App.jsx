import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/index";
import PublicLayout from "./layouts/public";
import Books from "./pages/public/books";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminLayout from "./layouts/admin";
import Dashboard from "./pages/admin";
import AdminBooks from "./pages/admin/books";
import BookCreate from "./pages/admin/books/create";
import AdminGenres from "./pages/admin/genres/AdminGenres";
import GenreCreate from "./pages/admin/genres/GenreCreate";
import AdminAuthors from "./pages/admin/authors/AdminAuthors";
import AuthorCreate from "./pages/admin/authors/AuthorCreate";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Parent Route menggunakan PublicLayout */}
                <Route element={<PublicLayout />}>
                    <Route index element={<Home />} />
                    <Route path="books" element={<Books />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>

                {/* admin layout */}
                <Route path="admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />

                    <Route path="books">
                        <Route index element={<AdminBooks />} />
                        <Route path="create" element={<BookCreate />} />
                    </Route>
                    
                    <Route path="genres">
                        <Route index element={<AdminGenres />} />
                        <Route path="create" element={<GenreCreate />} />
                    </Route>
                    

                    <Route path="authors">
                        <Route index element={<AdminAuthors />} />
                        <Route path="create" element={<AuthorCreate />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;