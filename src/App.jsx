import { useState, useEffect } from "react";
import "./App.css";
import Search from "./assets/Search.svg";
import MovieCard from "./Component/MovieCard";
const API_URL = "http://www.omdbapi.com?apikey=7ba4962c";

function App() {
  const [Movies, setMovies] = useState([]);
  const [SearchTerm, setSearchTerm] = useState("");
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data);
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies();
  }, []);

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      searchMovies(SearchTerm);
    }
  };

  return (
    <div className="app">
      <h1>Movie ID</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search for movies"
          value={SearchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          onKeyDown={handleKeypress}
        />
        <img
          src={Search}
          alt="Search"
          onClick={() => {
            searchMovies(SearchTerm);
          }}
        />
      </div>

      {Movies?.length > 0 ? (
        <div className="container">
          {Movies.map((Movie) => {
            return <MovieCard Movie={Movie} key={Movie.title} />;
          })}
        </div>
      ) : (
        <div>
          <h3 style={{ color: "white" }}>SORRY NO MOVIE FOUND</h3>
        </div>
      )}
    </div>
  );
}

export default App;
