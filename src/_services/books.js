import API from "../_api";

export const getbooks = async () => {
    const { data } = await API.get("/books");
    return data.data;
};

export const createBook = async (data) => {
    try {
        const response = await API.post("/books", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

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

export const createAuthor = async (data) => {
    try {
        const response = await API.post("/authors", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
