import MovieCard from "./MovieCard";
import { useState } from "react";


function FeaturedMovie({ featuredMovies }) {
    return (
        <>
            {
                featuredMovies.map(movie =>
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

export default FeaturedMovie;
