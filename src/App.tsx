import React from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/commonComponents/NavBar";
import MoviePage from "./pages/adminPages/MoviesPage";
import AddMoviePage from "./pages/adminPages/AddMoviePage";
import EditMoviePage from "./pages/adminPages/EditMoviePage";
import LoginForm from "./components/commonComponents/LoginForm";
import PrivateRoute from "./pages/PrivateRoute";
import HomePage from "./pages/HomePage";

function App() {
  
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginForm />} />
          <Route 
            path="/moviePage" 
            element={
              <PrivateRoute roles={['Admin']}>
                <MoviePage />
              </PrivateRoute>
            } 
          />
          <Route
            path="/addMovie"
            element={
              <PrivateRoute roles={['Admin']}>
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

