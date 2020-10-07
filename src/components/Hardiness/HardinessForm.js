import React, { Component } from "react";

export default class SignUpForm extends Component {
  state = {
    error: null,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onHardinessZoneSuccess();
  };

  render() {
    const { error } = this.state;
    return (
      <form className="HardinessForm" onSubmit={this.handleSubmit}>
        <div role="alert" className="alert">
          {error && <p className="error">{error}</p>}
        </div>
        <div className="zipcodeInput">
          <label htmlFor="zipcode">Zipcode:</label>
          <input type="text" name="zipcode" id="zipcode" maxLength="5" />
        </div>
        <section className="buttons">
          <button type="submit" className="primary">
            Submit
          </button>
        </section>
      </form>
    );
  }
}
