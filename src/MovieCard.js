import React from "react"
import "./MovieCard.css"
function MovieCard({ movie, genreList }) {
  const imageAPI = "https://image.tmdb.org/t/p/w342"

  const movieRatingColor = (rating) => {
    if (rating >= 8) {
      return "rating-green"
    } else if (rating >= 6.5) {
      return "rating-yellow"
    } else {
      return "rating-red"
    }
  }

  return (
    <div
      key={movie.id}
      style={{
        backgroundImage: `url(${imageAPI + movie.poster_path})`,
      }}
      className="movie-card"
    >
      <div className="movie-card-hidden">
        <div className="movie-title">{movie.name || movie.title}</div>
        <div className="movie-card-bottom">
          <div className="movie-rating-box">
            Rating:{" "}
            <span
              className={"movie-rating " + movieRatingColor(movie.vote_average)}
            >
              {movie.vote_average}
            </span>
          </div>
          <div className="genres-container">
            {movie.genre_ids.map((id) => (
              <span className="genre-span" key={id}>
                {genreList[id]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
