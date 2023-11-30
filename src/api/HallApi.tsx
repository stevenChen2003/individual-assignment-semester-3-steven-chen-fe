import axios from "axios";
import TokenManager from "./TokenManager";

axios.defaults.baseURL = "http://localhost:8080";

const HallApi = {
    getHallsByCinema: (cinemaId: any) => axios.get(`/halls?cinemaId=${cinemaId}`)
    .then(response => response.data.halls),

    getHall: (hallId: any) => axios.get(`/halls/${hallId}`)
    .then(response => response.data),

    addHall: (newHall: any) => axios.post("/halls", newHall,
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    }),

    updateHall: (updateHall: { id: any; }) => axios.put(`/halls/${updateHall.id}`, updateHall, 
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    }),

    deleteHall: (hallId: any) => axios.delete(`/halls/${hallId}`,
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    })
    .then((response) => response.data)

}

export default HallApi