import axios from "axios";
import TokenManager from "./TokenManager";

axios.defaults.baseURL = "http://localhost:8080";

const BookingApi = {
    addBooking: (newBooking: any) => axios.post("/bookings", newBooking,
    {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    }),

    getAllBookingsByUser: (userId: any, page = 0, size = 5) =>
    axios.get("/bookings/getAllByUser", {
      params: { userId, page, size },
      headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
    }),

  getAllBookings: (page = 0, size = 5) =>
    axios.get("/bookings/getAll", {
      params: { page, size },
      headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
    }),

}

export default BookingApi