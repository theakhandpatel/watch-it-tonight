import React, { useState, useEffect } from "react"
import { Divider, Tab } from "semantic-ui-react"
import MovieList from "./MovieList"

import { reactLocalStorage } from "reactjs-localstorage"
function Saved() {
  const [favMovies, setFavMovies] = useState([])
  const [wishList, setWishList] = useState([])
  const [genres, setGenres] = useState({})
  useEffect(() => {
    setFavMovies(
      Object.values(reactLocalStorage.getObject("favMovies", {}, true))
    )
    setWishList(
      Object.values(reactLocalStorage.getObject("wishList", {}, true))
    )
    // console.log(wishList, favMovies)
    fetchGenres()
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

  const panes = [
    {
      menuItem: "Favorites",
      render: () => (
        <Tab.Pane attached={false}>
          <MovieList movies={favMovies} genres={genres} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Watch Later",
      render: () => (
        <Tab.Pane attached={false}>
          <MovieList movies={wishList} genres={genres} />
        </Tab.Pane>
      ),
    },
  ]

  return (
    <div style={{ margin: "2rem 1rem" }}>
      <Tab
        menu={{ color: "red", size: "massive", vertical: true, tabular: true }}
        panes={panes}
      />
    </div>
  )
}

export default Saved
