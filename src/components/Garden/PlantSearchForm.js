import React, { Component } from "react";
import ApiContext from "../../ApiContext";

export default class PlantSearchForm extends Component {
  static contextType = ApiContext;

  static defaultProps = {
    editPlants: () => {},
  };

  state = {
    error: null,
    loading: false,
  };

  handleSubmit = (ev) => {
    ev.preventDefault();
    this.setState({ error: null, loading: true });
    const { plantName } = ev.target;
    if (
      this.props.plantNames.includes(
        `${plantName.value.charAt(0).toUpperCase()}${plantName.value.slice(1)}`
      )
    ) {
      this.setState({
        error: `That plant is already in your garden!`,
        loading: false,
      });
    } else {
      this.addPlant(plantName.value);
    }
    plantName.value = "";
  };

  determineHardiness = (temp) => {
    if (temp <= -56) {
      return "1a";
    } else if (temp > -55 && temp < -51) {
      return "1b";
    } else if (temp > -50 && temp < -46) {
      return "2a";
    } else if (temp > -45 && temp < -41) {
      return "2b";
    } else if (temp > -40 && temp < -36) {
      return "3a";
    } else if (temp > -35 && temp < -31) {
      return "3b";
    } else if (temp > -30 && temp < -26) {
      return "4a";
    } else if (temp > -25 && temp < -21) {
      return "4b";
    } else if (temp > -20 && temp < -16) {
      return "5a";
    } else if (temp > -15 && temp < -11) {
      return "5b";
    } else if (temp > -10 && temp < -6) {
      return "6a";
    } else if (temp > -5 && temp < -1) {
      return "6b";
    } else if (temp > 0 && temp < 4) {
      return "7a";
    } else if (temp > 5 && temp < 9) {
      return "7b";
    } else if (temp > 10 && temp < 14) {
      return "8a";
    } else if (temp > 15 && temp < 19) {
      return "8b";
    } else if (temp > 20 && temp < 24) {
      return "9a";
    } else if (temp > 25 && temp < 29) {
      return "9b";
    } else if (temp > 30 && temp < 34) {
      return "10a";
    } else if (temp > 35 && temp < 39) {
      return "10b";
    } else if (temp > 40 && temp < 44) {
      return "11a";
    } else if (temp > 45 && temp < 49) {
      return "11b";
    } else if (temp > 50 && temp < 54) {
      return "12a";
    } else if (temp > 55 && temp < 59) {
      return "12b";
    } else if (temp > 60 && temp < 64) {
      return "13a";
    } else if (temp >= 65) {
      return "13b";
    } else {
      return "N/A";
    }
  };

  addPlant = (plantName) => {
    this.setState({ error: null, loading: true });
    const url1 = `https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/plants?token=${process.env.REACT_APP_TREFLE_API_KEY}&filter[common_name]=${plantName}`;
    fetch(url1, {
      method: "GET",
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((plantInfo1) => {
        let id = plantInfo1.data[0].id;
        const url2 = `https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/plants/${id}?token=${process.env.REACT_APP_TREFLE_API_KEY}`;
        fetch(url2, {
          method: "GET",
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((plantInfo2) => {
            if (plantInfo2.data.length === 0) {
              this.setState({
                error: `There is not enough information in the database on this plant.`,
              });
            } else {
              let imageUrl =
                "https://visualsound.com/wp-content/uploads/2019/05/unavailable-image.jpg";
              if (plantInfo2.data.image_url !== null) {
                imageUrl = plantInfo2.data.image_url;
              }
              const newPlant = {
                name: `${plantInfo2.data.common_name
                  .charAt(0)
                  .toUpperCase()}${plantInfo2.data.common_name.slice(1)}`,
                image: imageUrl,
                family: plantInfo2.data.main_species.family,
                duration: plantInfo2.data.main_species.duration,
                hardiness: this.determineHardiness(
                  plantInfo2.data.main_species.growth.minimum_temperature.deg_f
                ),
                minTemp: {
                  F:
                    plantInfo2.data.main_species.growth.minimum_temperature
                      .deg_f,
                  C:
                    plantInfo2.data.main_species.growth.minimum_temperature
                      .deg_c,
                },
                shadeTol: plantInfo2.data.main_species.growth.light,
                minPrecipitation:
                  plantInfo2.data.main_species.growth.minimum_precipitation.mm,
                phRange: {
                  min: plantInfo2.data.main_species.growth.ph_minimum,
                  max: plantInfo2.data.main_species.growth.ph_maximum,
                },
                averageHeight:
                  plantInfo2.data.main_species.specifications.average_height.cm,
                bloomPeriod: plantInfo2.data.main_species.growth.bloom_months,
              };

              for (let prop in newPlant) {
                if (newPlant[prop] === null || newPlant[prop] === undefined)
                  newPlant[prop] = "N/A";
              }
              for (let prop in newPlant.minTemp) {
                if (
                  newPlant.minTemp[prop] === null ||
                  newPlant.minTemp[prop] === undefined
                )
                  newPlant.minTemp[prop] = "N/A";
              }
              for (let prop in newPlant.phRange) {
                if (
                  newPlant.phRange[prop] === null ||
                  newPlant.phRange[prop] === undefined
                )
                  newPlant.phRange[prop] = "N/A";
              }
              this.context.editPlants(newPlant);
              this.props.onNewPlant(newPlant);
            }
          })
          .catch(() => {
            this.setState({
              error: `Something went wrong. Please try again.`,
            });
          });
        this.setState({ error: null, loading: false });
      })
      .catch(() => {
        this.setState({
          error: `Something went wrong. Please try again.`,
        });
      });
  };

  render() {
    const { error, loading } = this.state;
    return (
      <section className="PlantSearchForm">
        <form className="plantForm" onSubmit={this.handleSubmit}>
          <h3>Add a Plant to your Garden</h3>
          {loading ? (
            <section className="loaderMessage">
              <div className="loader"></div>
            </section>
          ) : (
            <>
              <div role="alert" className="alert">
                {error && <p className="error">{error}</p>}
              </div>
              <div className="plantNameInput">
                <input
                  type="text"
                  id="plantName"
                  name="plantName"
                  placeholder="e.g. Rosemary"
                  required
                />
              </div>
              <section className="buttons">
                <button type="submit" className="primary">
                  Submit
                </button>
              </section>
            </>
          )}
        </form>
      </section>
    );
  }
}
