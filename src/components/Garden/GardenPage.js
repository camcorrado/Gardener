import React, { Component } from "react";
import ApiContext from "../../ApiContext";
import Nav from "../Nav/Nav";
import PlantCard from "./PlantCard";
import PlantSearchForm from "./PlantSearchForm";
import { Link } from "react-router-dom";
import "./Garden.css";

export default class GardenPage extends Component {
  static contextType = ApiContext;

  static defaultProps = {
    user: {},
    hardinessZone: "",
    plants: [],
    setGarden: () => {},
  };

  state = {
    plants: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    if (this.context.plants.length === 0) {
      this.context.setUser(() => {
        this.context.setGarden(this.context.user.id, () => {
          this.setState({ plants: this.context.plants });
        });
      });
    } else {
      this.setState({ plants: this.context.plants });
    }
  }

  handleNewPlant = (newPlant) => {
    this.setState({
      plants: [...this.state.plants, newPlant],
    });
  };

  handleDeletePlant = async (plantName) => {
    const updatedPlants = [];
    await this.state.plants.forEach((plant) => {
      if (plant.name !== plantName) {
        updatedPlants.push(plant);
        return plant;
      }
    });

    this.setState({ plants: updatedPlants });
    this.context.deletePlant(updatedPlants);
  };

  render() {
    const { error } = this.state;
    return (
      <section className="GardenPage">
        <Nav />
        {this.context.hardinessZone === null ? (
          <section className="Garden">
            <Link to="/HardinessZone" className="error">
              Please set your hardiness zone.
            </Link>
          </section>
        ) : (
          <>
            <PlantSearchForm onNewPlant={this.handleNewPlant} />
            <div role="alert" className="alert">
              {error && <p className="error">{error}</p>}
            </div>
            <section className="Garden">
              <h3>
                Your Garden
                {this.context.plants && this.context.plants.length === 0
                  ? " is currently empty! Search for plants to add to it!"
                  : ""}
              </h3>
              <ul>
                {this.state.plants ? (
                  this.state.plants.map((plant) => (
                    <li key={plant.name}>
                      <PlantCard
                        plantInfo={plant}
                        onDeletePlant={this.handleDeletePlant}
                      />
                    </li>
                  ))
                ) : (
                  <></>
                )}
              </ul>
            </section>
          </>
        )}
      </section>
    );
  }
}
