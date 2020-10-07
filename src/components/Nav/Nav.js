import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

export default class Nav extends Component {
  render() {
    return (
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="HardinessZone">Change Hardiness Zone</Link>
        <Link to="/">Logout</Link>
      </nav>
    );
  }
}
