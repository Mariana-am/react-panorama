import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./App.css";
import WeatherIcon from "./WeatherIcon";
import ForecastDay from "./ForecastDay";
import CurrentLocation from "./CurrentLocation";
import Search from "./Search";

export default class App extends Component {
  state = {};

  static propTypes = {
    city: PropTypes.string.isRequired
  };

  static defaultProps = {
    city: "lisbon",
    apiUrl: "https://api.openweathermap.org",
    apiKey: "87ab2c518113b309164dae566f4f3de9"
  };

  constructor(props) {
    super(props);

    this.refreshWeatherFromUrl(
      this.props.apiUrl +
        "/data/2.5/weather?" +
        "appid=" +
        this.props.apiKey +
        "&units=metric" +
        "&q=" +
        this.props.city
    );
  }

  friendlyDate(date) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let minutes = date.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;

    return days[date.getDay()] + " " + date.getHours() + ":" + minutes;
  }

  refreshWeatherFromUrl(url) {
    axios.get(url).then(response => {
      this.setState({
        conditions: {
          city: response.data.name,
          description: response.data.weather[0].main,
          icon: response.data.weather[0].icon,
          precipitation: "there's no API data",
          temperature: Math.round(response.data.main.temp),
          time: this.friendlyDate(new Date()),
          wind: Math.round(response.data.wind.speed) + " km/h",
          humidity: Math.round(response.data.main.humidity) + " %"
        }
      });
    });
  }

  refreshWeatherFromLatitudeAndLongitude = (latitude, longitude) => {
    this.refreshWeatherFromUrl(
      this.props.apiUrl +
        "/data/2.5/weather?" +
        "appid=" +
        this.props.apiKey +
        "&units=metric" +
        "&lat=" +
        latitude +
        "&lon=" +
        longitude
    );
  };

  refreshWeatherFromCity = city => {
    this.refreshWeatherFromUrl(
      this.props.apiUrl +
        "/data/2.5/weather?" +
        "appid=" +
        this.props.apiKey +
        "&units=metric" +
        "&q=" +
        city
    );
  };

  render() {
    if (this.state.conditions) {
      return (
        <div className="row">
          <div className="cityName">
            <Search refresh={this.refreshWeatherFromCity} />
            <CurrentLocation
              refresh={this.refreshWeatherFromLatitudeAndLongitude}
            />
          </div>
          <div className="weather-summary col-md-12">
            <div className="weather-summary-header col-md-3">
              <h1>{this.state.conditions.city}</h1>
              <div className="weather-detail__text">
                {this.state.conditions.time}
              </div>
              <div className="weather-detail__text">
                {this.state.conditions.description}
              </div>
            </div>
            <div className="weather-summary-big col-md-4">
              <div className="clearfix">
                <WeatherIcon icons={this.state.conditions.icon} />
                <div className=" weather-temp--today">
                  {this.state.conditions.temperature}
                </div>
                <div className="weather-unit__text weather-unit__text--today">
                  °C
                </div>
              </div>
            </div>
            <div className="weather-summary-text col-md-5">
              <div className="weather-detail__text">
                Precipitation: {this.state.conditions.precipitation}
              </div>
              <div className="weather-detail__text">
                Wind: {this.state.conditions.wind}
              </div>
              <div className="weather-detail__text">
                Humidity: {this.state.conditions.humidity}
              </div>
            </div>
          </div>
          <br />
          <div className=" col-md-12">
            <ForecastDay city={this.state.conditions.city} />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          The internet is doing its magic, <em>please wait...</em>
        </div>
      );
    }
  }
}
