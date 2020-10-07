import React, { Component } from "react";
import HardinessMeter from "../Hardiness/HardinessMeter";
import Nav from "../Nav/Nav";
import PlantCard from "./PlantCard";
import "./Garden.css";

export default class GardenPage extends Component {
  render() {
    return (
      <section className="GardenPage">
        <Nav />
        <HardinessMeter />
        <h3>Your Garden</h3>
        <section className="Garden">
          <PlantCard />
        </section>
      </section>
    );
  }
}
