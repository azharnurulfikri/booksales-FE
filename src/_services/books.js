import API from "../_api";

//_____________________Buku_____________________________
export const getbooks = async () => {
    const { data } = await API.get("/books");
    return data.data;
};

export const showBook = async (id) => {
    try {
        const { data } = await API.get(`/books/${id}`);
        return data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const createBook = async (bookData) => {
    try {
        const response = await API.post("/books", bookData);
        return response.data;
    } catch (error) {
        console.log("Error Validasi Laravel:", error.response?.data);
        throw error;
    }
};

export const updateBook = async (id, bookData) => {
    try {
        const { data } = await API.post(`/books/${id}`, bookData);
        return data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteBook = async (id) => {
    try {
        await API.delete(`/books/${id}`);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// _____________________Genre__________________
export const getGenres = async () => {
    try {
        const { data } = await API.get("/genres");
        return data.data || data;
    } catch (error) {
        console.log("Gagal ngambil genre:", error);
        throw error;
    }
};

export const createGenre = async (data) => {
    try {
        const response = await API.post("/genres", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// UPDATE & DELETE GENRE
export const updateGenre = async (id, data) => {
    try {
        // Pake PUT karena cuma kirim data JSON biasa (bukan file)
        const response = await API.put(`/genres/${id}`, data);
        return response.data;
    } catch (error) {
        console.log("Gagal update genre:", error);
        throw error;
    }
};

export const deleteGenre = async (id) => {
    try {
        const response = await API.delete(`/genres/${id}`);
        return response.data;
    } catch (error) {
        console.log("Gagal hapus genre:", error);
        throw error;
    }
};

// _____________________Author__________________
export const createAuthor = async (data) => {
    try {
        const response = await API.post("/authors", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateAuthor = async (id, data) => {
    try {
        const response = await API.put(`/authors/${id}`, data);
        return response.data;
    } catch (error) {
        console.log("Gagal update author:", error);
        throw error;
    }
};

export const deleteAuthor = async (id) => {
    try {
        const response = await API.delete(`/authors/${id}`);
        return response.data;
    } catch (error) {
        console.log("Gagal hapus author:", error);
        throw error;
    }
};
