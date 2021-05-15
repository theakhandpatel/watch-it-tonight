import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./MoviePage.css"
import { Button, Icon, Loader } from "semantic-ui-react"
import { reactLocalStorage } from "reactjs-localstorage"

function MoviePage() {
  const [isFav, setIsFav] = useState(false)
  const [isWatchLater, setIsWatchLater] = useState(false)
  const [movie, setMovie] = useState(null)
  const [fetching, SetFetching] = useState(true)
  const { id } = useParams()

  const imageAPI = "https://image.tmdb.org/t/p/"
  useEffect(() => {
    fetchDetails()
    const favMovies = reactLocalStorage.getObject("favMovies", {}, true)
    const wishList = reactLocalStorage.getObject("wishList", {}, true)
    if (favMovies[id]) {
      console.log(favMovies[id])
      setIsFav(true)
    }
    if (wishList[id]) {
      setIsWatchLater(true)
    }
  }, [id])

  const addToFav = () => {
    const favMovies = reactLocalStorage.getObject("favMovies", {}, true)
    if (isFav) {
      setIsFav(!isFav)
      delete favMovies[id]
      reactLocalStorage.setObject("favMovies", favMovies)
    } else {
      setIsFav(!isFav)
      favMovies[id] = movie
      reactLocalStorage.setObject("favMovies", favMovies)
    }
  }

  const addToWishlist = () => {
    const wishList = reactLocalStorage.getObject("wishList", {}, true)
    if (isWatchLater) {
      setIsWatchLater(!isWatchLater)
      delete wishList[id]
      reactLocalStorage.setObject("wishList", wishList)
    } else {
      setIsWatchLater(!isWatchLater)
      wishList[id] = movie
      reactLocalStorage.setObject("wishList", wishList)
    }
  }

  const fetchDetails = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        id +
        "?api_key=00b58007cae7349a3598d322d578631d&language=en-US"
    )
    const data = await response.json()
    setMovie(data)
    SetFetching(false)
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

          <Button onClick={addToFav} toggle active={!isFav} color="red">
            <Icon name="heart" />
            {isFav ? "Remove from Fav" : "Add to Fav"}
          </Button>

          <Button onClick={addToWishlist} toggle color="blue" icon="save">
            <Icon name="heart" />
            {isWatchLater ? "Remove from Watch Later" : "Watch Later"}
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <Loader size="massive" active inline="centered">
      Loading....
    </Loader>
  )
}

export default MoviePage
