import { useEffect, useState } from "react";
import Select from "react-select";
import MovieApi from "../api/MovieApi";

const MovieSelect = ({ onSelect }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchInfo = async () => {
          try {
            const moviesResponse = await MovieApi.getMovies();
            setMovies(moviesResponse);
          } catch (error) {
            console.error("Error fetching information:", error);
          }
        };
    
        fetchInfo();
      }, []);

    const movieOptions = movies.map((movie) => ({
        value: movie.movieId,
        label: movie.title,
        image: movie.imageURL,
      }));
  
    const handleSelect = (selectedOption) => {
      if (selectedOption) {
        onSelect(selectedOption.value);
      } else {
        onSelect(null);
      }
    };
  
    return (
      <div>
        <Select
              options={movieOptions}
              onChange={handleSelect}
              placeholder="Select a Movie"
              formatOptionLabel={(option) => (
                <div>
                  <img
                    src={option.image}
                    alt={option.label}
                    style={{
                      marginRight: "10px",
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                    }}
                  />
                  <span>{option.label}</span>
                </div>
              )}
            />
      </div>
    );
  };
  
  export default MovieSelect;