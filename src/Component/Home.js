import React, { useState, useEffect } from "react"
import "./Home.css"
import MovieList from "./MovieList"
function Home() {
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState(null)

  useEffect(() => {
    fetchGenres()
    fetchMovies()
  }, [])

  
const fetchGenres = async () => {
    const response2 = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=00b58007cae7349a3598d322d578631d&language=en-US"
    )
    const data2 = await response2.json()
    const genresMap = {}
    data2.genres.forEach((element) => {
      genresMap[element.id] = element.name
    })
    await setGenres(genresMap)
  }
  const fetchMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=00b58007cae7349a3598d322d578631d"
    )
    const data = await response.json()
    await setMovies(data.results)
  }

  return (
    <>
      <h2 className="trending">Trending Movies</h2>
      <MovieList movies={movies} genres={genres} />
    </>
  )
}

export default Home
