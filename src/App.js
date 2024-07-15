import React, { useState } from "react";
import { useEffect } from "react";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
import "./App.css";

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=699fad1c";

const App = () => {
  const [movie, setMovie] = useState([]);
  const [searchterm, setsearchterm] = useState("");

  useEffect(() => {
    searchMovies("superman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovie(data.Search);
  };

  return (
    <div className="app">
      <h1>MovieFlix</h1>
      <div className="search">
        <input
          type="text"
          value={searchterm}
          onChange={(e) => {
            setsearchterm(e.target.value);
          }}
        />
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchterm)} />
      </div>

      {movie?.length > 0 ? (
        <div className="container">
          {movie.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No moives found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
