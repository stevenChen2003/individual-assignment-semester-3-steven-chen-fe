import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import MovieList from '../components/commonComponents/MovieList';
import FilterBar from '../components/commonComponents/FilterBar';
import MovieApi from '../api/MovieApi';

const MAX_VISIBLE_PAGES = 5;

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
        const moviesResponse = await MovieApi.searchMovies(searchTerm, selectedGenre, currentPage, 2);
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

  const renderPaginationItems = () => {
    const items = [];
    const startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
    const endPage = Math.min(startPage + MAX_VISIBLE_PAGES - 1, totalPages);

    if (startPage > 1) {
      items.push(<Pagination.Prev key="prev" onClick={() => handlePageChange(currentPage)} />);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item key={i} active={i === currentPage + 1} onClick={() => handlePageChange(i)}>
          {i}
        </Pagination.Item>
      );
    }

    if (endPage < totalPages) {
      items.push(<Pagination.Next key="next" onClick={() => handlePageChange(currentPage + 2)} />);
    }

    return items;
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
          <Pagination>{renderPaginationItems()}</Pagination>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
