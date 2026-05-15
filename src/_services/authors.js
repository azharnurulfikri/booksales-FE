import API from "../_api"

export const getAuthors = async () => {
    const { data } = await API.get("/authors");
    return data.data;
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