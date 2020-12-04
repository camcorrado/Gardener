import React, { Component } from "react";
import Header from "../Header/Header";
import LoginForm from "./LoginForm";
import TokenService from "../../services/token-service";
import ApiContext from "../../ApiContext";
import "./Login.css";

export default class LoginPage extends Component {
  static contextType = ApiContext;

  static defaultProps = {
    setGarden: () => {},
  };

  state = {
    error: null,
  };

  componentDidMount() {
    if (TokenService.getAuthToken()) {
      this.props.history.push("/Garden");
    }
  }

  handleLoginSuccess = () => {
    this.props.history.push("/Garden");
  };

  handleNoHardinessZone = () => {
    this.props.history.push("/HardinessZone");
  };

  render() {
    const { error } = this.state;
    return (
      <section className="loginPage">
        <header className="appHeader">
          <Header />
        </header>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
          onNoHardinessZone={this.handleNoHardinessZone}
        />
        <div role="alert" id="loginAlert" className="alert">
          {error && <p className="error">{error}</p>}
        </div>
      </section>
    );
  }
}
