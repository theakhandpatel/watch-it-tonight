import _ from "lodash"
import React, { useState } from "react"
import { Search, Grid } from "semantic-ui-react"
import { useHistory } from "react-router-dom"

const SearchBox = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState([])
  const [value, setValue] = useState([])
  const history = useHistory()

  const handleResultSelect = (e, { result }) => {
    setValue(result.title)
    history.push("/movie/" + result.id)
  }

  const handleSearchChange = async (e, { value }) => {
    setValue(value)
    if (value !== "") {
      setIsLoading(true)
      setValue(value)

      const response = await fetch(
        "https://api.themoviedb.org/3/search/movie?api_key=00b58007cae7349a3598d322d578631d&language=en-US&page=1&include_adult=false&query=" +
          value
      )

      const data = await response.json()
      await setIsLoading(false)
      await setResults(data.results.splice(0, 5))
    }
  }

  // const onKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     history.push("/search?query=" + encodeURI(value))
  //     Keyboard.dismiss()
  //   }
  // }

  return (
    // <Grid>
    //   <Grid.Column width={5}>
    <Search
      placeholder="Search Movies here"
      transparent
      // onKeyPress={onKeyPress}
      aligned="left"
      loading={isLoading}
      onResultSelect={handleResultSelect}
      onSearchChange={_.debounce(handleSearchChange, 500, {
        leading: true,
      })}
      results={results}
      value={value}
    />
    //   </Grid.Column>
    // </Grid>
  )
}

export default SearchBox
