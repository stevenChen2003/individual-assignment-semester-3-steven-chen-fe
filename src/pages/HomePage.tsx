import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import MovieList from '../components/commonComponents/MovieList';
import FilterBar from '../components/commonComponents/FilterBar';
import MovieApi from '../api/MovieApi';
import PaginationComponent from '../components/commonComponents/Pagination';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

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
        const moviesResponse = await MovieApi.searchMovies(searchTerm, selectedGenre, currentPage, 1);
        setMovies(moviesResponse.content);
        setTotalPages(moviesResponse.totalPages);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [searchTerm, selectedGenre, currentPage]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(0);
  };

  const handleGenreChange = (value) => {
    setSelectedGenre(value);
    setCurrentPage(0);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page - 1);
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
          <PaginationComponent
           currentPage={currentPage}
           totalPages={totalPages}
           onPageChange={handlePageChange}
         />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
