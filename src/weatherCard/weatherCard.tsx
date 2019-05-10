import * as React from "react";
import styles from "./weatherCard.module.scss";
import { IWeather } from "../reducers/weatherReducer";

export interface IProps {
  weather: IWeather;
}

export interface IState {}

class WeatherCard extends React.Component<IProps, IState> {
  // state = { :  }
  public render() {
    return (
      <div className={styles.card}>
        <div className={styles.image} />
        <h1>City of: {this.props.weather.name}</h1>
        <p>Temperature: {this.props.weather.main.temp} </p>
        <p>Humidity:{this.props.weather.main.humidity} </p>
        <p>
          Minimum temperature <br /> at the moment:
          {this.props.weather.main.temp_min}
        </p>
      </div>
    );
  }
}

export default WeatherCard;
