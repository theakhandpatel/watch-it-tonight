import _ from "lodash"
import React, { Component } from "react"
import { Search, Grid } from "semantic-ui-react"

const initialState = { isLoading: false, results: [], value: "" }

export default class SearchExampleStandard extends Component {
  state = initialState

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = async (e, { value }) => {
    this.setState({ value })
    if (value !== "") {
      this.setState({ isLoading: true, value })

      const response = await fetch(
        "https://api.themoviedb.org/3/search/movie?api_key=00b58007cae7349a3598d322d578631d&language=en-US&page=1&include_adult=false&query=" +
          value
      )

      const data = await response.json()
      await this.setState({
        isLoading: false,
        results: data.results.splice(0, 5),
      })
    }
  }
  onKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log(this.state.value)
    }
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Grid>
        <Grid.Column width={5}>
          <Search
            onKeyPress={this.onKeyPress}
            aligned="left"
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
          />
        </Grid.Column>
      </Grid>
    )
  }
}
