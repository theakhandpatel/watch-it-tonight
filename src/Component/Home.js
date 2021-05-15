import React, { useState, useEffect } from "react"
import "./Home.css"
import MovieList from "./MovieList"
import { Pagination, Container, Loader } from "semantic-ui-react"
function Home() {
  const [movies, setMovies] = useState()
  const [genres, setGenres] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (!genres) {
      fetchGenres()
    }
    fetchMovies()
  }, [page])

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
    setIsLoading(true)
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=00b58007cae7349a3598d322d578631d&page=" +
        page
    )
    const data = await response.json()
    await setMovies(data.results)
    await setTotalPages(data.total_pages)
    setIsLoading(false)
  }
  const handlePageChange = (e, pageInfo) => {
    setPage(pageInfo.activePage)
  }

  return (
    <>
      <h2 className="trending">Trending Movies</h2>
      {isLoading ? (
        <Loader size="massive" active inline="centered">
          Loading....
        </Loader>
      ) : (
        <MovieList movies={movies} genres={genres} />
      )}
      {movies ? (
        <Container textAlign="center">
          <Pagination
            defaultActivePage={1}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Container>
      ) : null}
    </>
  )
}

export default Home
