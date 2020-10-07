import { Link } from "react-router-dom";
import React, { Component } from "react";
import "./SignUp.css";

export default class SignUpForm extends Component {
  state = {
    error: null,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSignUpSuccess();
  };

  render() {
    const { error } = this.state;
    return (
      <form className="SignUpForm" onSubmit={this.handleSubmit}>
        <div role="alert" className="alert">
          {error && <p className="error">{error}</p>}
        </div>
        <div className="firstNameInput">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" name="firstName" id="firstName" maxLength="20" />
        </div>
        <div className="lastNameInput">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" name="lastName" id="lastName" maxLength="20" />
        </div>
        <div className="emailInput">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" maxLength="120" />
        </div>
        <div className="firstPasswordInput">
          <label htmlFor="firstPassword">Password:</label>
          <input
            type="password"
            name="firstPassword"
            id="firstPassword"
            maxLength="20"
          />
        </div>
        <div className="secondPasswordInput">
          <label htmlFor="secondPassword">Confirm Password:</label>
          <input
            type="password"
            name="secondPassword"
            id="secondPassword"
            maxLength="20"
          />
        </div>
        <div className="termsOfService">
          <label htmlFor="terms of service" id="termsOfService">
            I have read &amp; agree to the &nbsp;
            <Link to="/terms" className="termsLink">
              terms of service:
            </Link>
          </label>
          <input type="checkbox" name="terms" id="terms" />
        </div>
        <section className="buttons">
          <button type="submit" className="primary">
            Sign Up
          </button>
          <Link to="/" className="button" aria-label="back button">
            Back
          </Link>
        </section>
      </form>
    );
  }
}
