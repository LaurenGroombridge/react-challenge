import React from "react";
import logo from "./logo.svg";
import "./App.css";
import WeatherCard from "./weatherCard/weatherCard";
import Container from "./container/weatherContainer";
import { Provider } from "react-redux";
import store from "./store/";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          Weather Card React/Redux Challenge
        </header>
        <Container />
      </div>
    </Provider>
  );
};

export default App;
