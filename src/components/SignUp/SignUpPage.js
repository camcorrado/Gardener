import Header from "../Header/Header";
import React, { Component } from "react";
import SignUpForm from "../../components/SignUp/SignUpForm";
import TokenService from "../../services/token-service";
import "./SignUp.css";

export default class SignUpPage extends Component {
  componentDidMount() {
    if (TokenService.getAuthToken()) {
      this.props.history.push("/Garden");
    }
  }

  handleSignUpSuccess = () => {
    this.props.history.push("/HardinessZone");
  };

  render() {
    return (
      <section className="signUpPage">
        <header className="appHeader">
          <Header />
        </header>
        <SignUpForm onSignUpSuccess={this.handleSignUpSuccess} />
      </section>
    );
  }
}
