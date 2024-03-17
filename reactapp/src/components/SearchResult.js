import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

function SearchResult ({searchText, movies}) {
    const [movieResult, setMovieResult] = useState(movies);
    useEffect(() => {
        const searchRes = movies.filter(
            movie => movie.title.toLowerCase().includes(searchText.toLowerCase())
          );
        setMovieResult(searchRes);
    }, [searchText]);  

    return (<>
        <h3>Search: {searchText}</h3>
        <div className="container">
          {movieResult.map(movie =>
            <MovieCard
              movieId={movie.movieId}
              movieTitle={movie.title}
              overview={movie.overview}
              avgRating={movie.avgRating ? movie.avgRating : "-"}
              imageUrl={movie.imageUrl}
            />
          )}
        </div>
      </>);
};

export default SearchResult;