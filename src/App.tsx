import React from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/commonComponents/NavBar";
import MoviePage from "./pages/adminPages/MoviesPage";
import EditMoviePage from "./pages/adminPages/EditMoviePage";
import LoginForm from "./components/commonComponents/LoginForm";
import PrivateRoute from "./pages/PrivateRoute";
import HomePage from "./pages/HomePage";
import SignUp from "./components/commonComponents/SignUp";
import MovieDetailPage from "./pages/MovieDetailPage";
import PersonalPage from "./pages/PersonalPage";
import CinemasPage from "./pages/adminPages/CinemasPage";
import HallPage from "./pages/HallPage";
import ShowtimePage from "./pages/adminPages/ShowtimePage";
import ShowDetailPage from "./pages/adminPages/ShowDetailPage";
import CinemaPage from "./pages/CinemaPage";
import ShowtimeDetailPage from "./pages/ShowtimeDetailPage";
import ChatPage from "./pages/ChatPage";
import AdminBookingPage from "./pages/adminPages/AdminBookingPage";
import BookingDetailPage from "./pages/BookingDetailPage";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/cinema" element={<CinemaPage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route
            path="/admin/showtime"
            element={
              <PrivateRoute roles={["Admin"]}>
                <ShowtimePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookingDetails/:id"
            element={
              <PrivateRoute roles={["Admin", "Customer"]}>
                <BookingDetailPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/booking"
            element={
              <PrivateRoute roles={["Admin"]}>
                <AdminBookingPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/showtimeDetails/:id"
            element={
              <PrivateRoute roles={["Admin"]}>
                <ShowDetailPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/show/:id"
            element={
              <PrivateRoute roles={["Admin", "Customer"]}>
                <ShowtimeDetailPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <PrivateRoute roles={["Admin", "Customer"]}>
                <ChatPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/hall"
            element={
              <PrivateRoute roles={["Admin"]}>
                <HallPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/cinema"
            element={
              <PrivateRoute roles={["Admin"]}>
                <CinemasPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/:id"
            element={
              <PrivateRoute roles={["Admin", "Customer"]}>
                <PersonalPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/movie"
            element={
              <PrivateRoute roles={["Admin"]}>
                <MoviePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/editMovie/:id"
            element={
              <PrivateRoute roles={["Admin"]}>
                <EditMoviePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
