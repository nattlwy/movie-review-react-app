import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";


function LatestMovie({ latestMovies }) {
    return (
        <>
            {
                latestMovies.map(movie =>
                    <MovieCard
                        movieId={movie.movieId}
                        movieTitle={movie.title}
                        overview={movie.overview}
                        avgRating={movie.avgRating ? movie.avgRating : "-"}
                        imageUrl={movie.imageUrl}
                    />
                )
            }
        </>
    );
}

export default LatestMovie;