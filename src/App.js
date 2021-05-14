import "./App.css"
import Navbar from "./Component/Navbar"
import Home from "./Component/Home"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Search from "./Component/Search"
import Saved from "./Component/Saved"
import ErrorPage from "./Component/ErrorPage"
import MoviePage from "./Component/MoviePage"

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search" exact component={Search} />
          <Route path="/saved" exact component={Saved} />
          <Route path="/movie/:id" component={MoviePage} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
