import * as React from "react";
import Weather from "../weatherCard/weatherCard";
import { connect } from "react-redux";
import { fetchWeather, IWeather } from "../reducers/weatherReducer";
import { IStore } from "../reducers";
import styles from "./weatherContainer.module.scss";
import WeatherCard from "../weatherCard/weatherCard";

export interface IReactProps {}

export interface IReduxProps {
  weather: IWeather[];
  fetchWeather: (cityId: string) => void;
}

export interface IState {
  weather: IWeather[];
}

class Container extends React.Component<IReactProps & IReduxProps, IState> {
  public state = { weather: [] };

  public componentDidMount = () => {
    this.props.fetchWeather("2643744,4749005,4219762");
  };

  public componentDidUpdate(prevProps: IReactProps & IReduxProps) {
    if (prevProps !== this.props) {
      this.setState({ weather: this.props.weather });
    }
  }

  public render() {
    // return <div className={styles.main}>{this.getWeatherJSX()}</div>;
    return (
      <section className={styles.section}>
        {this.props.weather.map((event, index) => (
          <WeatherCard key={index} weather={event} />
        ))}
      </section>
    );
  }
}

const mapStateToProps = (state: IStore, props: IReactProps) => {
  return {
    weather: state.weather.weather,
    ...props
  };
};

const mapDispatchToProps = { fetchWeather };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
