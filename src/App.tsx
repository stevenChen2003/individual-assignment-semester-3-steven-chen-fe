import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import NavBar from './components/NavBar';
import MoviePage from './pages/MoviesPage';
import AddMoviePage from './pages/AddMoviePage';

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
