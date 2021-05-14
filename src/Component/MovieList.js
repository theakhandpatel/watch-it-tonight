import React from "react"
import MovieCard from "./MovieCard"
import "./MovieList.css"

function MovieList({ movies, genres }) {
  return (
    <div className="movie-container">
      {movies?.map((movie, index) => (
        <MovieCard key={index} movie={movie} genreList={genres} />
      ))}
    </div>
  )
}

export default MovieList
