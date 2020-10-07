import React, { Component } from "react";
import GardenPage from "../Garden/GardenPage";
import HardinessPage from "../Hardiness/HardinessPage";
import Hero from "../Hero/Hero";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import LoginPage from "../Login/LoginPage";
import SignUpPage from "../SignUp/SignUpPage";
import { Route, Switch } from "react-router-dom";
import "./App.css";

class App extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  state = {
    userInfo: {},
    userProfile: {},
    hardinessZone: null,
    garden: [],
  };

  render() {
    return (
      <main className="App">
        <ErrorBoundary>
          <Switch>
            <Route exact path={"/"} component={Hero} />
            <Route path={"/Login"} component={LoginPage} />
            <Route path={"/SignUp"} component={SignUpPage} />
            <Route path={"/HardinessZone"} component={HardinessPage} />
            <Route path={"/Garden"} component={GardenPage} />
          </Switch>
        </ErrorBoundary>
      </main>
    );
  }
}

export default App;
