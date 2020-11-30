import React, { Component } from "react";
import "./Garden.css";

export default class PlantCard extends Component {
  deletePlant = () => {
    this.props.onDeletePlant(this.props.plantInfo.name);
  };

  render() {
    const {
      name,
      image,
      family,
      hardiness,
      duration,
      minTemp,
      shadeTol,
      minPrecipitation,
      phRange,
      averageHeight,
      bloomPeriod,
    } = this.props.plantInfo;
    let nameCap = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
    let familyCap = family;
    if (family !== "N/A") {
      familyCap = `${family.charAt(0).toUpperCase()}${family.slice(1)}`;
    }
    let durationCap = duration;
    if (duration !== "N/A") {
      durationCap = `${duration[0].charAt(0).toUpperCase()}${duration[0].slice(
        1
      )}`;
    }
    let bloomPeriodDash = bloomPeriod;
    if (bloomPeriod !== "N/A") {
      bloomPeriodDash = `${bloomPeriod.slice(0, 1)}-${bloomPeriod.slice(1)}`;
    }

    return (
      <section className="PlantCard">
        <div className="imgContainer">
          <img src={image} className="plantImg" alt={name} />
        </div>
        <div className="plantInfo">
          <h3 className="plantName">{nameCap}</h3>
          <h4>Family: {familyCap}</h4>
          <h4>Duration: {durationCap}</h4>
          <h4>Hardiness Zone: {hardiness}</h4>
          <h4>
            Temperature Min: {minTemp.F}
            {minPrecipitation !== "N/A" ? `F/${minTemp.C}C` : ""}
          </h4>
          <h4>Shade Tolerance: {shadeTol}</h4>
          <h4>
            Precipitation Min: {minPrecipitation}
            {minPrecipitation !== "N/A" ? "mm" : ""}
          </h4>
          <h4>
            Soil pH Range:
            {phRange.min !== "N/A" ? ` ${phRange.min}-${phRange.max}` : ""}
          </h4>
          <h4>
            Average Height: {averageHeight}
            {averageHeight !== "N/A" ? "cm" : ""}
          </h4>
          <h4>Bloom Period: {bloomPeriodDash.toUpperCase()}</h4>
          <div className="buttons">
            <button className="delete" onClick={this.deletePlant}>
              X
            </button>
          </div>
        </div>
      </section>
    );
  }
}
