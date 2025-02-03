import axios from "axios";

const pixabayApiKey = "47865988-0e202f3c070f6317e288e8f49";

export const getPixabayPictures = async ({ query, page=1, perPage=12}: { query: string, page?: number, perPage?: number }) => {
    axios.defaults.baseURL = 'https://pixabay.com/api/';
    try {
        const response = await axios.get("/", {
            params: {
                key: pixabayApiKey,
                q: query,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: true,
                page: page,
                per_page: perPage,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error during getting images from Pixabay: ", error);
    }
}