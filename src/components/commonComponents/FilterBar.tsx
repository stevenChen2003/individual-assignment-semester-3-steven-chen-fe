import React from 'react';

const FilterBar = ({ onSearchChange, onGenreChange, genres }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        className="form-control mb-2"
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select className="form-control" onChange={(e) => onGenreChange(e.target.value)}>
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
