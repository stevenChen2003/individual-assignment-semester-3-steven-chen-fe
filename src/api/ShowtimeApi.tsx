import axios from "axios";
import TokenManager from "./TokenManager";

axios.defaults.baseURL = "http://localhost:8080";

const ShowtimeApi = {
    addShowtime: (newShowtime: any) => axios.post("/showtime", newShowtime,
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    }),

    getShowtimeByHallId: (hallId: any) => axios.get(`/showtime?hallId=${hallId}`)
    .then(response => response.data),

    getShowtimeByCinemaAndDate: (cinemaId: any, day: string) => axios.get(`/showtime/cinema?cinemaId=${cinemaId}&day=${day}`)
   .then(response => response.data),

    getShowtime: (showtimeId: any) => axios.get(`/showtime/${showtimeId}`)
    .then(response => response.data),

    getSeats: (showtimeId: any) => axios.get(`/showtime/seats?showtimeId=${showtimeId}`)
    .then(response => response.data)

}

export default ShowtimeApi;