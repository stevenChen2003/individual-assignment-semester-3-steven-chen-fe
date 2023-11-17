import React from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/commonComponents/NavBar";
import MoviePage from "./pages/adminPages/MoviesPage";
import AddMoviePage from "./pages/adminPages/AddMoviePage";
import EditMoviePage from "./pages/adminPages/EditMoviePage";
import LoginForm from "./components/commonComponents/LoginForm";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<MoviePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/addMovie"
            element={
              <PrivateRoute roles={['Admin', 'Customer']}>
                <AddMoviePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/editMovie/:id"
            element={
              <PrivateRoute roles={['Admin']}>
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

