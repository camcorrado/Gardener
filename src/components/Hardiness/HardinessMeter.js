import React, { Component } from "react";
import ApiContext from "../../ApiContext";

class HardinessMeter extends Component {
  static contextType = ApiContext;

  static defaultProps = {
    hardinessZone: "",
  };

  render() {
    return (
      <section className="hardinessMeter">
        <p>
          Your&nbsp;
          <a
            href="https://plants.usda.gov/hardiness.html"
            alt="USDA Hardiness Zone Map"
            target="_blank"
            rel="noopener noreferrer"
            className="hardinessZoneInfo"
          >
            Hardiness Zone
          </a>
          &nbsp;is:
        </p>
        <div className="hardinessZoneScale">
          <img
            src="https://image.flaticon.com/icons/png/512/31/31714.png"
            alt="leaf indicator"
            className="hardinessZoneIndicator"
            id={this.context.hardinessZone}
          />
        </div>
      </section>
    );
  }
}

export default HardinessMeter;
