import React, { Component } from "react"
import { Menu } from "semantic-ui-react"

import { NavLink } from "react-router-dom"
import SearchBox from "./SearchBox"

export default class Navbar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Menu.Item
          as={NavLink}
          to="/"
          exact
          name="home"
          active={activeItem === "home"}
          content="Netflic"
          onClick={this.handleItemClick}
        />

        <Menu.Item
          as={NavLink}
          to="/saved"
          name="saved"
          active={activeItem === "saved"}
          content="Saved"
          onClick={this.handleItemClick}
        />

        <Menu.Item
          as={NavLink}
          to="/search"
          name="search"
          active={activeItem === "search"}
          content="Advanced Search"
          onClick={this.handleItemClick}
        />

        <Menu.Menu position="right">
          <Menu.Item>
            <SearchBox />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}
