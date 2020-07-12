import React, { Component } from "react";
import Login from "./components/login";
import Home from "./components/home";
import Register from "./components/register";

import NavBar from "./components/navbar";
import { Route, Switch } from "react-router-dom";
import Songlist from "./components/songlist";
import AddSong from "./components/addSong";
import addPlaylist from "./components/addPlaylist";

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <NavBar />

        <div>
          <Switch>
            <Route path="/playlist/:id" component={Songlist} />

            <Route path="/register" component={Register} />
            <Route path="/createplaylist" component={addPlaylist} />
            <Route path="/addsong" component={AddSong} />
            <Route path="/home" component={Home} />
            <Route path="/" exact component={Login} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
