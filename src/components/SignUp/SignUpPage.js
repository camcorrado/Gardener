import Header from "../Header/Header";
import React, { Component } from "react";
import SignUpForm from "../../components/SignUp/SignUpForm";
import "./SignUp.css";

export default class SignUpPage extends Component {
  handleSignUpSuccess = () => {
    this.props.history.push("/HardinessZone");
  };
  render() {
    return (
      <section className="SignUpPage">
        <header className="appHeader">
          <Header />
        </header>
        <h3>Register</h3>
        <SignUpForm onSignUpSuccess={this.handleSignUpSuccess} />
      </section>
    );
  }
}
