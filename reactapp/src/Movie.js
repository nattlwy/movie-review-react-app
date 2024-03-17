import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import postForm from "./postForm";
import ReviewCard from "./components/ReviewCard";

function Movie({ loggedIn }) {
    const IMAGE_URL_PREFIX = "https://image.tmdb.org/t/p/w1280";
    const { movieId } = useParams();
    const [movie, setMovie] = useState([]);
    const [formData, setFormData] = useState({});
    const [reviews, setReviews] = useState([]);
    const [hasReviewContent, setHasReviewContent] = useState(false);
    const [hasRating, setHasRating] = useState(false);



    async function handleInputChange(e) {
        if (e.target.name === 'content'){
            e.target.value.length > 0 ? setHasReviewContent(true) : setHasReviewContent(false);
        }
        if (e.target.name === 'rating') {
            e.target.value !== 'default' ? setHasRating(true) : setHasRating(false);
        }
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const fullForm = {
            ...formData,
            timestamp: Date.now(),
            username: sessionStorage.getItem('user'),
            movieId: parseInt(movieId)
        }
        const res = await postForm(fullForm, 'http://localhost:3300/movie/' + movieId + '/review');
        const data = await res.json();
        console.log(data.message);

        // append review after post
        fetch('http://localhost:3300/movie/' + movieId + '/review')
            .then((res) => res.json())
            .then(data => setReviews(data))
    }

    useEffect(() => {
        // set previous page
        sessionStorage.setItem('prevpage', window.location.pathname);
        // fetch movies
        fetch('http://localhost:3300/movie/' + movieId)
            .then((res) => res.json())
            .then((data) => setMovie(data));

        // fetch reviews
        fetch('http://localhost:3300/movie/' + movieId + '/review')
            .then((res) => res.json())
            .then(data => setReviews(data))
    }, []);

    if (movie.length > 0) {
        return (
            <div id="movieOverviewBody">
                <div className="card mb-3">
                    <img className="card-img-top" src={IMAGE_URL_PREFIX + movie[0].backdropUrl} alt={movie[0].title} />
                    <h4 className="card-title">Overview</h4>
                    <p className="card-text">{movie[0].overview}</p>
                </div>
                <div className="reviews">
                    <h4 className="card-title">Reviews</h4>
                    {reviews.length > 0 ?
                        (reviews.map(review =>
                            <ReviewCard 
                                username={review.username}
                                content={review.content}
                                rating={review.rating}
                                date={new Date(review.reviewTimestamp).toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(0,-3)}
                            />))
                        : (<h4>Be the first one to review this movie !!!</h4>)}
                    {sessionStorage.user ? (null)
                        : (<div>
                            <p><a href="/login">Login</a> to write a review! </p>
                        </div>)}
                    {sessionStorage.user ? (
                        <>
                            <h4 className="card-title">Write Your Review !</h4>
                            <div className="form-group">
                                <form onSubmit={handleSubmit}>
                                    <textarea className="form-control" name="content" id="reviewcontent" rows="3" onChange={handleInputChange}></textarea>
                                    <select className="custom-select w-25" name="rating" onChange={handleInputChange}>
                                        <option value="default" selected>Rating 1-10</option>
                                        <option value="1" >1</option>
                                        <option value="2" >2</option>
                                        <option value="3" >3</option>
                                        <option value="4" >4</option>
                                        <option value="5" >5</option>
                                        <option value="6" >6</option>
                                        <option value="7" >7</option>
                                        <option value="8" >8</option>
                                        <option value="9" >9</option>
                                        <option value="10" >10</option>
                                    </select><br />
                                    <input type="hidden" name="username" value={sessionStorage.getItem('user')} />
                                    <input type="hidden" name="movieId" value={movieId} />
                                    {hasRating && hasReviewContent ?
                                    (<input type="submit" className="btn btn-dark" name="submit" value="Submit" />)
                                    : (<input type="submit" className="btn btn-dark" name="submit" value="Submit" disabled/>)}

                                </form>
                            </div></>) : null}
                </div>
            </div>
        );
    }
    else {
        return (<>Loading...</>)
    }
};

export default Movie;
