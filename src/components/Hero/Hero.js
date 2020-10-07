import React, { Component } from "react";
import Header from "../Header/Header";

export default class Hero extends Component {
  signUp = (e) => {
    e.preventDefault();
    this.props.history.push("/SignUp");
  };

  logIn = (e) => {
    e.preventDefault();
    this.props.history.push("/Login");
  };

  render() {
    return (
      <section className="Hero">
        <Header />
        <section className="buttons">
          <button onClick={this.signUp}>Sign Up</button>
          <button onClick={this.logIn} className="primary">
            Log In
          </button>
        </section>
      </section>
    );
  }
}
