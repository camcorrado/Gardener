import React, { Component } from "react";
import ApiContext from "../../ApiContext";
import config from "../../config";
import TokenService from "../../services/token-service";

export default class HardinessForm extends Component {
  static contextType = ApiContext;

  static defaultProps = {
    user: {},
    plants: [],
    setHardinessZone: () => {},
  };

  state = {
    error: null,
    zipcode: "",
  };

  handleChangeInputZipcode = (ev) => {
    const { value, maxLength } = ev.target;
    const zipcode = value.slice(0, maxLength);

    this.setState({
      zipcode,
    });
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { zipcode } = ev.target;
    const url = `https://cors-anywhere.herokuapp.com/https://phzmapi.org/${zipcode.value}.json`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        const updatedGarden = {
          hardiness_zone: data.zone,
          plants: this.context.plants || [],
        };
        fetch(`${config.API_ENDPOINT}/gardens/${this.context.user.id}`, {
          method: "PATCH",
          body: JSON.stringify(updatedGarden),
          headers: {
            "content-type": "application/json",
            authorization: `bearer ${TokenService.getAuthToken()}`,
          },
        })
          .then((res) =>
            !res.ok ? res.json().then((e) => Promise.reject(e)) : true
          )
          .then(async () => {
            await this.context.setHardinessZone(updatedGarden.hardiness_zone);
            this.props.onHardinessZoneSuccess();
          })
          .catch((res) => {
            this.setState({ error: res.error });
          });
      })
      .catch(() => {
        this.setState({
          error: `Something went wrong. Please enter a valid zipcode.`,
        });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form className="HardinessForm" onSubmit={this.handleSubmit}>
        <h3>Discover your Hardiness Zone</h3>
        <div role="alert" className="alert">
          {error && <p className="error">{error}</p>}
        </div>
        <div className="zipcodeInput">
          <input
            type="number"
            name="zipcode"
            id="zipcode"
            maxLength="5"
            placeholder="Zipcode"
            onChange={this.handleChangeInputZipcode}
            value={this.state.zipcode}
            required
          />
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
