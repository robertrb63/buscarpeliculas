import { useState, useEffect, useRef } from 'react';
import MovieGrid from './MovieGrid';
import { useDebounce } from './useDebounce';
import './App.css';

const API_KEY = '5f497eb8'; // Consíguela en http://www.omdbapi.com/apikey.aspx

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const debouncedQuery = useDebounce(query, 600);
  const lastQueryRef = useRef('');

  useEffect(() => {
    if (debouncedQuery && debouncedQuery !== lastQueryRef.current) {
      fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${debouncedQuery}`)
        .then(res => res.json())
        .then(data => {
          if (data.Search) {
            setMovies(data.Search);
            lastQueryRef.current = debouncedQuery;
          } else {
            setMovies([]);
          }
        });
    }
  }, [debouncedQuery]);

  return (
    <div className="App">
      <h1>🎬 Buscador de Películas</h1>
      <input
        type="text"
        placeholder="Buscar película..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <MovieGrid movies={movies} />
    </div>
  );
}

export default App;