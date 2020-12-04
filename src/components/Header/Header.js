import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default class Header extends Component {
  render() {
    return (
      <section className="header">
        <h2>Welcome to</h2>
        <Link to="/" id="appTitle">
          <h1>Gardener</h1>
        </Link>
        <h3>A hub for all your garden's information.</h3>
      </section>
    );
  }
}
