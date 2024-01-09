import axios from "axios";
import TokenManager from "./TokenManager";

axios.defaults.baseURL = "http://localhost:8080";

const BookingApi = {
    addBooking: (newBooking: any) => axios.post("/bookings", newBooking,
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    }),

}

export default BookingApi