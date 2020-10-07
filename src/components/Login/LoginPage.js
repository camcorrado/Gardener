import React, { Component } from "react";
import Header from "../Header/Header";
import LoginForm from "./LoginForm";
import "./Login.css";

export default class LoginPage extends Component {
  state = {
    error: null,
  };

  handleLoginSuccess = () => {
    this.props.history.push("/Garden");
  };

  render() {
    const { error } = this.state;
    return (
      <section className="LoginPage">
        <header className="appHeader">
          <Header />
        </header>
        <h3 id="loginTitle">Login</h3>
        <LoginForm onLoginSuccess={this.handleLoginSuccess} />
        <div role="alert" id="loginAlert" className="alert">
          {error && <p className="error">{error}</p>}
        </div>
      </section>
    );
  }
}
