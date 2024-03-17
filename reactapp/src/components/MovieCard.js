import { useState } from "react";

export default function MovieCard(props) {
    const IMAGE_URL_PREFIX = "https://image.tmdb.org/t/p/w1280";
    return (
      <div className="movie card">
            <a href={"movie/" + props.movieId}>
                <img src={ IMAGE_URL_PREFIX + props.imageUrl }/>
            </a>
            <div className="movie-info">
                <h3>{props.movieTitle}</h3>
                <span className="orange">{props.avgRating}</span>
            </div>
            <div className="overview">
                <h3>Overview</h3>
                <p> {props.overview }</p>
            </div>
        </div>  
    );
}