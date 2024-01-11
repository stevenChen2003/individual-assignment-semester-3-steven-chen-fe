import React, { useState, useEffect } from 'react';
import MovieList from '../components/commonComponents/MovieList';
import FilterBar from '../components/commonComponents/FilterBar';
import MovieApi from '../api/MovieApi';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesResponse = await MovieApi.getMovies();
        setMovies(moviesResponse);

        const uniqueGenres = [...new Set(moviesResponse.map((movie) => movie.genre))];
        setGenres(uniqueGenres);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log("Search",searchTerm);
        console.log("Genre",selectedGenre);
        const moviesResponse = await MovieApi.searchMovies(searchTerm, selectedGenre, currentPage, 5);
        console.log("Test",moviesResponse);
        setMovies(moviesResponse.content);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
 
    fetchMovies();
  }, [searchTerm, selectedGenre, currentPage]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleGenreChange = (value) => {
    setSelectedGenre(value);
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-3">
          <FilterBar
            onSearchChange={handleSearchChange}
            onGenreChange={handleGenreChange}
            genres={genres}
          />
        </div>
        <div className="col-md-9">
          <MovieList movies={movies} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;



