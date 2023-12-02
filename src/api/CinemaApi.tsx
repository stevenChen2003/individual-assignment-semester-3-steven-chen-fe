import axios from "axios";
import TokenManager from "./TokenManager";

axios.defaults.baseURL = "http://localhost:8080";

const CinemaApi = {
    getCinemas: () => axios.get(`/cinemas`)
    .then(response => response.data.cinemas),

    getCinema: (cinemaId: any) => axios.get(`/cinemas/${cinemaId}`)
    .then(response => response.data),

    addCinema: (newCinema: any) => axios.post("/cinemas", newCinema,
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    }),

    updateCinema: (updateCinema: { cinemaId: any; }) => axios.put(`/cinemas/${updateCinema.cinemaId}`, updateCinema, 
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    }),

    deleteCinema: (cinemaId: any) => axios.delete(`/cinemas/${cinemaId}`,
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    })
    .then((response) => response.data)

}

export default CinemaApi