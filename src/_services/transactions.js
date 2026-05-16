import API from "../_api";

export const getTransaction = async () => {
    const { data } = await API.get("/transactions", {
        headers: {
            // UBAH: dari "accessToken" menjadi "token"
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }    
    })
    return data.data
}

export const createTransaction = async (data) => {
    try {
        const response = await API.post("/transactions", data, {
            headers: {
                // UBAH: dari "accessToken" menjadi "token"
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data; 
    } catch (error) {
        console.error("Error di createTransaction:", error);
        throw error;
    }
};