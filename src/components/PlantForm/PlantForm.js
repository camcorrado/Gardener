import React, { Component } from "react";

class PlantForm extends Component {
  render() {
    return (
      <section className="PlantForm">
        <form className="plant">
          <fieldset>
            <label for="plantName">Add a plant to your garden:</label>
            <input
              type="text"
              id="plantName"
              name="plantName"
              placeholder="e.g. Rosemary"
              required
            />
            <button type="submit">Submit</button>
            <p id="error"></p>
          </fieldset>
        </form>
      </section>
    );
  }
}

export default PlantForm;
