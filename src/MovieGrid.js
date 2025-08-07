import './MovieGrid.css';

export default function MovieGrid({ movies }) {
  return (
    <div className="grid">
      {movies.map(movie => (
        <div key={movie.imdbID} className="card">
          <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'} alt={movie.Title} />
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
        </div>
      ))}
    </div>
  );
}