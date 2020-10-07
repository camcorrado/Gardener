import React, { Component } from "react";
import { Link } from "react-router-dom";

class HardinessMeter extends Component {
  render() {
    return (
      <section className="HardinessMeter">
        <h3>
          Your&nbsp;
          <Link
            href="https://planthardiness.ars.usda.gov/PHZMWeb/"
            alt="USDA Hardiness Zone Map"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hardiness Zone
          </Link>
          &nbsp;is:
        </h3>
        <div className="hardinessZoneScale">
          <img
            src="https://image.flaticon.com/icons/png/512/31/31714.png"
            alt="leaf indicator"
            className="hardinessZoneIndicator"
          />
        </div>
      </section>
    );
  }
}

export default HardinessMeter;
