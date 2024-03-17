
function SlideShow({ slideShowMovies }) {
    const IMAGE_URL_PREFIX = "https://image.tmdb.org/t/p/w1280";

    return (<div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-ride="carousel">
        <ol className="carousel-indicators">
            {slideShowMovies.map((movie, idx) => {
                if (idx === 0) {
                    return (<li data-target="#carouselExampleIndicators" data-slide-to={idx} className="active"></li>);
                }
                else {
                    return (<li data-target="#carouselExampleIndicators" data-slide-to={idx}></li>)
                }
            })}
        </ol>
        <div className="carousel-inner">
            {slideShowMovies.map((movie, idx) => {
                if (idx === 0) {
                    return (<div className="carousel-item active">
                        <img className="d-block w-100" src={IMAGE_URL_PREFIX + movie.backdropUrl} alt={movie.title} />
                        <div className="carousel-caption d-none d-md-block">
                            <h4>{movie.title}</h4>
                        </div>
                    </div>);
                }
                else {
                    return (<div className="carousel-item">
                        <img className="d-block w-100" src={IMAGE_URL_PREFIX + movie.backdropUrl} alt={movie.title} />
                        <div className="carousel-caption d-none d-md-block">
                            <h4>{movie.title}</h4>
                        </div>
                    </div>)
                }
            })}

        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
        </a>
    </div>);
}

export default SlideShow;
