import React, { useState } from "react"
import { Menu } from "semantic-ui-react"

import { NavLink } from "react-router-dom"
import SearchBox from "./SearchBox"
import "./Navbar.css"

export default function Navbar() {
  const [activeItem, setActiveItem] = useState({})

  const handleItemClick = (e, { name }) => setActiveItem(name)

  return (
    <Menu className="navbar" inverted stackable>
      <Menu.Item
        as={NavLink}
        to="/"
        exact
        name="home"
        active={activeItem === "home"}
        content="Netflic"
        onClick={handleItemClick}
      />

      <Menu.Item
        as={NavLink}
        to="/saved"
        name="saved"
        active={activeItem === "saved"}
        content="Saved"
        onClick={handleItemClick}
      />

      <Menu.Item
        as={NavLink}
        to="/search"
        name="search"
        active={activeItem === "search"}
        content="Advanced Search"
        onClick={handleItemClick}
      />

      {/* <Menu.Menu position="right"> */}
      <Menu.Item position="right">
        <SearchBox />
      </Menu.Item>
      {/* </Menu.Menu> */}
    </Menu>
  )
}
