import React, { Component } from "react";
import ApiContext from "../../ApiContext";
import { Link } from "react-router-dom";
import "./Nav.css";

export default class Nav extends Component {
  static contextType = ApiContext;

  static defaultProps = {
    hardinessZone: null,
    logOut: () => {},
  };

  handleClickLogOut = (e) => {
    e.preventDefault();
    this.context.logOut();
  };

  render() {
    const pathname = window.location.pathname;
    return (
      <nav className="navbar">
        {pathname === "/HardinessZone" ? (
          this.context.hardinessZone !== null ? (
            <Link to="/Garden" className="button">
              View Your Garden
            </Link>
          ) : (
            <></>
          )
        ) : (
          <Link to="/HardinessZone" className="button">
            {this.context.hardinessZone !== null
              ? `Change Your Hardiness Zone (${this.context.hardinessZone})`
              : "Set Your Hardiness Zone"}
          </Link>
        )}
        <p></p>
        <button onClick={this.handleClickLogOut} aria-label="logout button">
          Logout
        </button>
      </nav>
    );
  }
}
