import React, { Component } from "react";
import "./Garden.css";

export default class PlantCard extends Component {
  render() {
    return (
      <section className="PlantCard">
        <div class="imgContainer">
          <img src="${plantImg}" class="plantImg" crossorigin="anonymous" />
        </div>
        <h3 class="plantTitle">TEST</h3>
        <h4>Hardiness Zone: TEST</h4>
        <h4>Temperature Min: TEST</h4>
        <h4>Shade Tolerance: TEST</h4>
        <h4>Watering Frequency: TEST</h4>
        <h4>Fertilizing Frequency: TEST</h4>
        <h4>Mature Height (ft): TEST</h4>
        <h4>Bloom Period: TEST</h4>
        <button class="delete">X</button>
      </section>
    );
  }
}
