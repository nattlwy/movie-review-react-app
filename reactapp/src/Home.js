import MovieCard from "./components/MovieCard";
import NavBar from "./components/NavBar";
import SlideShow from './components/SlideShow';
import FeaturedMovie from "./components/FeaturedMovie";
import LatestMovie from "./components/LatestMovie";

import { useState, useEffect } from "react";

// for selected movies in Latest Movies section
const getTopNRecentMovies = (n, movies) => {
  const tempArr = [...movies];
  tempArr.sort((a, b) => b.releaseDate - a.releaseDate)
  return tempArr.slice(0, n);
}

// for selected movies in Featured Movies section
const getTopNFeaturedMovies = (n, movies) => {
  let tempArr = [...movies];
  // tempArr = tempArr.filter(movie => movie.avgRating);
  tempArr.sort((a, b) => b.avgRating - a.avgRating);
  return tempArr.slice(0, n);
}

function Home({ searchText, loggedIn }) {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);

  // query movie data on render
  useEffect(() => {
    console.log(1)
    // set previous page as current page for login redirect
    sessionStorage.setItem('prevpage', window.location.pathname);
    fetch('http://localhost:3300/')
      .then((res) => res.json())
      .then((data) => {
        data = data.map(movie => ({
          ...movie,
          releaseDate: new Date(movie.releaseDate)
        }))
        setMovies(data);
        setAllMovies(data);
        console.log(1.1)
      })
  }, []);

  // featured movies
  const featuredMovie = getTopNFeaturedMovies(4, allMovies);
  // latest movies
  const latestMovies = getTopNRecentMovies(4, allMovies);
  // for slideshows
  const slideShowMovies = allMovies.filter((movie, idx) => {
    return idx < 3;
  })

  return (
    <>
      {/* <NavBar loggedIn = { props.loggedIn }/> */}

      {searchText === "" ?

        (<>
          <SlideShow slideShowMovies={slideShowMovies} />
          <br />
          <h3>Featured</h3>
          <div className={"container"} >
            <FeaturedMovie featuredMovies={featuredMovie} />
          </div>
          <h3>Latest</h3>
          <div className={"container"} >
            <LatestMovie latestMovies={latestMovies} />
          </div>
        </>)
        : (<>
          <h3>Search: {searchText}</h3>
          <div className="container">
            {

            movies.filter(
              movie => movie.title && movie.title.toLowerCase().includes(searchText.toLowerCase())
            ).map(movie =>
              <MovieCard
                movieId={movie.movieId}
                movieTitle={movie.title}
                overview={movie.overview}
                avgRating={movie.avgRating ? movie.avgRating : "-"}
                imageUrl={movie.imageUrl}
              />
            )}
          </div>
        </>)
      }

    </>
  );

}

export default Home;
