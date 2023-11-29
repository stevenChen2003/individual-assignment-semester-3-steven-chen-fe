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

function App() {
  
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/movie/:id" element={<MovieDetailPage/>}/>
          <Route 
            path="/moviePage" 
            element={
              <PrivateRoute roles={['Admin']}>
                <MoviePage />
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

