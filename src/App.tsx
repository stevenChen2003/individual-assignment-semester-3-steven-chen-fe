import { useState } from 'react'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import NavBar from './components/NavBar';
import MoviePage from './pages/MoviesPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<MoviePage/>}/>
        </Routes>
      </Router>
    </>

  )
}

export default App
