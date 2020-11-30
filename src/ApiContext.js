import React from "react";

export default React.createContext({
  user: {},
  hardinessZone: null,
  plants: [],
  plantNames: [],
  setUser: () => {},
  setGarden: () => {},
  setHardinessZone: () => {},
  editPlants: () => {},
  deletePlant: () => {},
  logOut: () => {},
});
