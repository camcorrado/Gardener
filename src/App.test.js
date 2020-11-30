import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import App from "./components/App/App";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import SignUpPage from "./components/SignUp/SignUpPage";
import SignUpForm from "./components/SignUp/SignUpForm";
import LoginPage from "./components/Login/LoginPage";
import LoginForm from "./components/Login/LoginForm";
import Nav from "./components/Nav/Nav";
import HardinessPage from "./components/Hardiness/HardinessPage";
import HardinessForm from "./components/Hardiness/HardinessForm";
import HardinessMeter from "./components/Hardiness/HardinessMeter";
import GardenPage from "./components/Garden/GardenPage";
import PlantSearchForm from "./components/Garden/PlantSearchForm";
import PlantCard from "./components/Garden/GardenPage";
import PageNotFound from "./components/PageNotFound/PageNotFound";

describe("Gardener App Components", () => {
  it("renders the App without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders the Error Boundary without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(
      <BrowserRouter>
        <App>
          <ErrorBoundary />
        </App>
      </BrowserRouter>,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders the Header without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders the Hero without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders the Sign Up Page without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(
      <BrowserRouter>
        <SignUpPage />
      </BrowserRouter>,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders the Sign Up Form without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(
      <BrowserRouter>
        <SignUpForm />
      </BrowserRouter>,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders the Login Page without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders the Login Form without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders the Nav without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders the Hardiness Page without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(
      <BrowserRouter>
        <HardinessPage />
      </BrowserRouter>,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });
  it("renders the Hardiness Form without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(
      <BrowserRouter>
        <HardinessForm />
      </BrowserRouter>,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });
  it("renders the Hardiness Meter without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(
      <BrowserRouter>
        <HardinessMeter />
      </BrowserRouter>,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });
  it("renders the Garden Page without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(
      <BrowserRouter>
        <GardenPage />
      </BrowserRouter>,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });
  it("renders the Plant Search Form without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(
      <BrowserRouter>
        <PlantSearchForm />
      </BrowserRouter>,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });
  it("renders the Plant Card without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(
      <BrowserRouter>
        <PlantCard />
      </BrowserRouter>,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });
  it("renders the Page Not Found without crashing", () => {
    const div = document.createElement("div");

    ReactDOM.render(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });
});
