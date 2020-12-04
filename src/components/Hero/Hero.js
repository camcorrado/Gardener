import React, { Component } from "react";
import Header from "../Header/Header";
import TokenService from "../../services/token-service";
import "./Hero.css";

export default class Hero extends Component {
  signUp = (e) => {
    e.preventDefault();
    this.props.history.push("/SignUp");
  };

  logIn = (e) => {
    e.preventDefault();
    this.props.history.push("/Login");
  };

  garden = (e) => {
    e.preventDefault();
    this.props.history.push("/Garden");
  };

  hardiness = (e) => {
    e.preventDefault();
    this.props.history.push("/HardinessZone");
  };

  render() {
    return (
      <section className="hero">
        <Header />
        {TokenService.hasAuthToken() ? (
          <section className="buttons">
            <button onClick={this.garden}>View Your Garden</button>
            <button onClick={this.hardiness}>Set Your Hardiness Zone</button>
          </section>
        ) : (
          <section className="buttons">
            <button onClick={this.signUp}>Sign Up</button>
            <button onClick={this.logIn} className="primary">
              Log In
            </button>
          </section>
        )}
      </section>
    );
  }
}
