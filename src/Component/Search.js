import React, { useState, useEffect } from "react"
import { Container, Form, Pagination, Loader } from "semantic-ui-react"
import MovieList from "./MovieList"

function Search() {
  const [movies, setMovies] = useState(null)
  const [genres, setGenres] = useState(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(null)
  const [query, setQuery] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchGenres()
  }, [])

  useEffect(() => {
    if (query !== null) {
      fetchMovies()
    }
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
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=00b58007cae7349a3598d322d578631d&language=en-US&page=${page}&include_adult=false&query=${encodeURI(
      query
    )}`

    console.log(searchUrl)
    const response = await fetch(searchUrl)
    const data = await response.json()
    await setMovies(data.results)
    await setTotalPages(data.total_pages)
    setIsLoading(false)
  }
  const handlePageChange = async (e, pageInfo) => {
    setPage(pageInfo.activePage)
  }

  const submitQuery = () => {
    fetchMovies()
  }

  return (
    <div>
      <Container textAlign="center" text>
        <h2>Advanced Search</h2>
      </Container>
      <Container>
        <Form onSubmit={submitQuery}>
          <Form.Input
            value={query}
            focus
            icon="search"
            labelPosition="left"
            size="huge"
            label="Search here"
            placeholder="Enter The movie name here"
            onChange={(e) => setQuery(e.target.value)}
          />
        </Form>
      </Container>
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
    </div>
  )
}

export default Search
