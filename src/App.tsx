import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/commonComponents/NavBar";
import MoviePage from "./pages/adminPages/MoviesPage";
import AddMoviePage from "./pages/adminPages/AddMoviePage";
import EditMoviePage from "./pages/adminPages/EditMoviePage";
import LoginForm from "./components/commonComponents/LoginForm";

function App() {
  return (
    <>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<MoviePage/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/addMovie" element={<AddMoviePage/>}/>
          <Route path="/editMovie/:id" element={<EditMoviePage/>}/>
        </Routes>
      </Router>
    </>

  )
}

export default App
