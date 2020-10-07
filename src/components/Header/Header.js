import React, { Component } from "react";
import "./Header.css";

export default class Header extends Component {
  render() {
    return (
      <section className="Header">
        <h2>Welcome to</h2>
        <h1>Gardener</h1>
        <h3>A hub for all your garden's information.</h3>
      </section>
    );
  }
}
