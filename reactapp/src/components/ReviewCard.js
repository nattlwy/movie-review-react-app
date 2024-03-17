function ReviewCard ({username, content, rating, date}) {
    return (
        <div class="card review-card">
            <h6 class="font-weight-bold">{username}</h6>
            <div class="movie-info">
                <p class="font-weight-normal">{content}</p>
                <span class="orange">{rating}</span>
            </div>
            <footer class="font-weight-light">{date}</footer>
        </div>
    );
}

export default ReviewCard;
