import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/commonComponents/NavBar";
import MoviePage from "./pages/adminPages/MoviesPage";
import AddMoviePage from "./pages/adminPages/AddMoviePage";

function App() {
  return (
    <>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<MoviePage/>}/>
          <Route path="/addMovie" element={<AddMoviePage/>}/>
        </Routes>
      </Router>
    </>

  )
}

export default App
