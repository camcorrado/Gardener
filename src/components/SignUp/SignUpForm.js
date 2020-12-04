import { Link } from "react-router-dom";
import React, { Component } from "react";
import TokenService from "../../services/token-service";
import AuthApiService from "../../services/auth-api-service";
import ApiContext from "../../ApiContext";
import config from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "../../services/Icons";
import "./SignUp.css";

export default class SignUpForm extends Component {
  static contextType = ApiContext;

  static defaultProps = {
    setUser: () => {},
  };

  state = {
    error: null,
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    this.setState({ error: null });

    const {
      firstName,
      lastName,
      email,
      firstPassword,
      secondPassword,
    } = ev.target;
    if (firstPassword.value !== secondPassword.value) {
      this.setState({ error: `Passwords do not match.` });
    } else {
      AuthApiService.postUser({
        email: email.value,
        password: firstPassword.value,
        full_name: `${firstName.value} ${lastName.value}`,
      })
        .then(() => {
          AuthApiService.postLogin({
            email: email.value,
            password: firstPassword.value,
          })
            .then((res) => {
              TokenService.saveAuthToken(res.authToken);
              this.context.setUser(() => {
                fetch(`${config.API_ENDPOINT}/gardens`, {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                    authorization: `bearer ${TokenService.getAuthToken()}`,
                  },
                })
                  .then((res) =>
                    !res.ok
                      ? res.json().then((e) => Promise.reject(e))
                      : res.json()
                  )
                  .catch((res) => {
                    this.setState({ error: res.error });
                  });
              });
            })
            .then(() => {
              firstName.value = "";
              lastName.value = "";
              email.value = "";
              firstPassword.value = "";
              secondPassword.value = "";
              this.props.onSignUpSuccess();
            })
            .catch((res) => {
              this.setState({ error: res.error });
            });
        })
        .catch((res) => {
          this.setState({ error: res.error });
        });
    }
  };

  render() {
    const { error } = this.state;
    const { buttonDict } = icons;
    return (
      <form className="signUpForm" onSubmit={this.handleSubmit}>
        <h3>Sign Up</h3>
        <div role="alert" className="alert">
          {error && <p className="error">{error}</p>}
        </div>
        <div className="nameInputs">
          <input
            type="text"
            name="firstName"
            id="firstName"
            maxLength="20"
            minLength="2"
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="lastName"
            id="lastName"
            maxLength="20"
            minLength="2"
            placeholder="Last Name"
            required
          />
        </div>
        <div className="emailInput">
          <input
            type="email"
            name="email"
            id="email"
            maxLength="120"
            placeholder="Email"
            required
          />
        </div>
        <div className="firstPasswordInput">
          <input
            type="password"
            name="firstPassword"
            id="firstPassword"
            maxLength="20"
            placeholder="Password"
            required
          />
        </div>
        <div className="secondPasswordInput">
          <input
            type="password"
            name="secondPassword"
            id="secondPassword"
            maxLength="20"
            placeholder="Confirm Password"
            required
          />
        </div>
        <section className="buttons">
          <button type="submit" className="primary">
            Sign Up
          </button>
          <Link to="/" className="button" aria-label="back button">
            <FontAwesomeIcon icon={buttonDict.faUndo} className="faIcon" />
          </Link>
        </section>
      </form>
    );
  }
}
