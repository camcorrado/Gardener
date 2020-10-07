import React, { Component } from "react";
import HardinessForm from "./HardinessForm";
import Nav from "../Nav/Nav";
import "./Hardiness.css";

export default class HardinessPage extends Component {
  handleHardinessSuccess = () => {
    this.props.history.push("/Garden");
  };
  render() {
    return (
      <section className="HardinessZonePage">
        <Nav />
        <h3>Discover your Hardiness Zone</h3>
        <HardinessForm onHardinessZoneSuccess={this.handleHardinessSuccess} />
      </section>
    );
  }
}
