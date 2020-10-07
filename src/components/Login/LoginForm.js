import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export default class LoginForm extends Component {
  state = {
    error: null,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onLoginSuccess();
  };

  render() {
    const { error } = this.state;
    return (
      <form className="LoginForm" onSubmit={this.handleSubmit}>
        <div role="alert" className="alert">
          {error && <p className="error">{error}</p>}
        </div>
        <div className="emailInput">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" />
        </div>
        <div className="passwordInput">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" />
        </div>
        <section className="buttons">
          <button type="submit" className="primary">
            Login
          </button>
          <Link to="/" className="button" aria-label="back button">
            Back
          </Link>
        </section>
      </form>
    );
  }
}
