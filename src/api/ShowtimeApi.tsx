import axios from "axios";
import TokenManager from "./TokenManager";

axios.defaults.baseURL = "http://localhost:8080";

const ShowtimeApi = {
    addShowtime: (newShowtime: any) => axios.post("/showtime", newShowtime,
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    }),

}

export default ShowtimeApi;