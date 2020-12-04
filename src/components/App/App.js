import React, { Component } from "react";
import ApiContext from "../../ApiContext";
import config from "../../config";
import GardenPage from "../Garden/GardenPage";
import HardinessPage from "../Hardiness/HardinessPage";
import Hero from "../Hero/Hero";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import LoginPage from "../Login/LoginPage";
import PageNotFound from "../PageNotFound/PageNotFound";
import SignUpPage from "../SignUp/SignUpPage";
import { Route, Switch } from "react-router-dom";
import AuthApiService from "../../services/auth-api-service";
import IdleService from "../../services/idle-service";
import TokenService from "../../services/token-service";
import PublicRoute from "../../services/PublicRoute";
import PrivateRoute from "../../services/PrivateRoute";
import "./App.css";

class App extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  state = {
    user: {},
    plants: [],
    plantNames: [],
    hardinessZone: null,
    error: null,
  };

  componentDidMount() {
    IdleService.setIdleCallback(this.logoutFromIdle);
    if (TokenService.hasAuthToken()) {
      IdleService.registerIdleTimerResets();
      TokenService.queueCallbackBeforeExpiry(() => {
        AuthApiService.postRefreshToken();
      });
      this.handleSetUser(() => {
        this.handleSetGarden(this.state.user.id);
      });
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets();
    TokenService.clearCallbackBeforeExpiry();
  }

  logoutFromIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.forceUpdate();
  };

  handleSetUser = (cb) => {
    fetch(`${config.API_ENDPOINT}/users`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .then((user) => {
        this.setState({ user: user }, cb);
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  handleSetGarden = (id, cb) => {
    this.setState({ error: null });
    fetch(`${config.API_ENDPOINT}/gardens/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
      )
      .then((garden) => {
        if (garden.plants[0] === null) {
          this.setState(
            {
              plants: [],
              hardinessZone: null,
            },
            cb
          );
        } else {
          const plantNames = [];
          garden.plants.forEach((plant) => plantNames.push(plant.name));
          this.setState(
            {
              plants: garden.plants || [],
              hardinessZone: garden.hardiness_zone || null,
              plantNames: plantNames,
            },
            cb
          );
        }
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  handleSetHardinessZone = (hardinessZone) => {
    this.setState({ hardinessZone: hardinessZone });
  };

  handleEditPlants = (newPlant) => {
    const updatedPlants = [...this.state.plants];
    updatedPlants.push(newPlant);
    const updatedGarden = {
      plants: updatedPlants,
      hardiness_zone: this.state.hardinessZone,
    };
    fetch(`${config.API_ENDPOINT}/gardens/${this.state.user.id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedGarden),
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : true
      )
      .then(() => {
        this.setState({
          plants: updatedPlants,
          plantNames: [...this.state.plantNames, newPlant.name],
        });
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  handleDeletePlant = async (updatedPlants, updatedPlantNames) => {
    const updatedGarden = {
      plants: updatedPlants,
      hardiness_zone: this.state.hardinessZone,
    };
    fetch(`${config.API_ENDPOINT}/gardens/${this.state.user.id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedGarden),
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then((res) =>
        !res.ok ? res.json().then((e) => Promise.reject(e)) : true
      )
      .then(() => {
        this.setState({ plants: updatedPlants, plantNames: updatedPlantNames });
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  handleLogOut = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.setState({
      user: {},
      plants: [],
      plantNames: [],
      hardinessZone: null,
      error: null,
    });
  };

  render() {
    const value = {
      user: this.state.user,
      hardinessZone: this.state.hardinessZone,
      plants: this.state.plants,
      plantNames: this.state.plantNames,
      setUser: this.handleSetUser,
      setGarden: this.handleSetGarden,
      setHardinessZone: this.handleSetHardinessZone,
      editPlants: this.handleEditPlants,
      deletePlant: this.handleDeletePlant,
      logOut: this.handleLogOut,
    };
    return (
      <ApiContext.Provider value={value}>
        <main className="app">
          <ErrorBoundary>
            <Switch>
              <Route exact path={"/"} component={Hero} />
              <PublicRoute path={"/Login"} component={LoginPage} />
              <PublicRoute path={"/SignUp"} component={SignUpPage} />
              <PrivateRoute path={"/HardinessZone"} component={HardinessPage} />
              <PrivateRoute path={"/Garden"} component={GardenPage} />
              <Route component={PageNotFound} />
            </Switch>
          </ErrorBoundary>
        </main>
      </ApiContext.Provider>
    );
  }
}

export default App;
