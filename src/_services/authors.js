import API from "../_api"

export const getAuthors = async () => {
    // GET biarkan publik tanpa token (sesuai routes/api.php lu)
    const { data } = await API.get("/authors");
    return data.data;
};

export const createAuthor = async (data) => {
    try {
        const response = await API.post("/authors", data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Gagal create author:", error);
        throw error;
    }
}; 

export const updateAuthor = async (id, data) => {
    try {
        const response = await API.put(`/authors/${id}`, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Gagal update author:", error);
        throw error;
    }
};

export const deleteAuthor = async (id) => {
    try {
        // Untuk Axios delete, config headers ditaruh sebagai parameter kedua
        const response = await API.delete(`/authors/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data;
    } catch (error) {
        console.log("Gagal hapus author:", error);
        throw error;
    }
};