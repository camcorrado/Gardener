import React, { Component } from "react";
import ApiContext from "../../ApiContext";
import HardinessForm from "./HardinessForm";
import HardinessMeter from "./HardinessMeter";
import Nav from "../Nav/Nav";
import "./Hardiness.css";

export default class HardinessPage extends Component {
  static contextType = ApiContext;

  static defaultProps = {
    hardinessZone: "",
  };

  render() {
    return (
      <section className="HardinessZonePage">
        <Nav />
        <HardinessForm onHardinessZoneSuccess={this.handleHardinessSuccess} />
        {this.context.hardinessZone !== null ? <HardinessMeter /> : <></>}
      </section>
    );
  }
}
