import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./MoviePage.css"

function MoviePage() {
  const [movie, setMovie] = useState(null)
  const [fetching, SetFetching] = useState(true)
  const { id } = useParams()
  const imageAPI = "https://image.tmdb.org/t/p/"
  useEffect(() => {
    fetchDetails()
  }, [])

  const fetchDetails = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "?api_key=00b58007cae7349a3598d322d578631d&language=en-US"
    )
    const data = await response.json()
    setMovie(data)
    SetFetching(false)
    console.log(movie)
  }
  return !fetching ? (
    <div
      className="movie-details-container"
      style={{
        backgroundImage: "url(" + imageAPI + "w780" + movie.backdrop_path + ")",
      }}
    >
      <div className="backdrop">
        <div className="movie-frame">
          <img src={imageAPI + "w300" + movie.poster_path} alt={movie.title} />
        </div>
        <div className="movie-details">
          <h2 className="movie-title">
            {movie.title} ({new Date(movie.release_date).getFullYear()})
          </h2>
          <p className="movie-overview">{movie.overview}</p>
        </div>
      </div>
    </div>
  ) : (
    <div>"Loading"</div>
  )
}

export default MoviePage
