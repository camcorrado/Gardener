import React, { Component } from "react";
import ApiContext from "../../ApiContext";
import { Link } from "react-router-dom";
import AuthApiService from "../../services/auth-api-service";
import TokenService from "../../services/token-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "../../services/Icons";
import "./Login.css";

export default class LoginForm extends Component {
  static contextType = ApiContext;

  static defaultProps = {
    user: {},
    history: {
      push: () => {},
    },
    setUser: () => {},
    setGarden: () => {},
  };

  state = {
    error: null,
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    this.setState({ error: null });
    const { email, password } = ev.target;
    this.handleSubmitJwtAuth(email, password);
  };

  handleSubmitJwtAuth = (email, password) => {
    AuthApiService.postLogin({
      email: email.value,
      password: password.value,
    })
      .then((res) => {
        TokenService.saveAuthToken(res.authToken);
        this.context.setUser(() => {
          this.context.setGarden(this.context.user.id, () => {
            if (this.context.hardinessZone !== null) {
              this.props.onLoginSuccess();
            } else {
              this.props.onNoHardinessZone();
            }
          });
        });
      })
      .then(() => {
        email.value = "";
        password.value = "";
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    const { buttonDict } = icons;
    return (
      <form className="LoginForm" onSubmit={this.handleSubmit}>
        <h3>Login</h3>
        <div role="alert" className="alert">
          {error && <p className="error">{error}</p>}
        </div>
        <div className="emailInput">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="passwordInput">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />
        </div>
        <section className="buttons">
          <button type="submit" className="primary">
            Login
          </button>
          <Link to="/" className="button" aria-label="back button">
            <FontAwesomeIcon icon={buttonDict.faUndo} className="faIcon" />
          </Link>
        </section>
      </form>
    );
  }
}
