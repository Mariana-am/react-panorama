import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./App.css";
import WeatherIcon from "./WeatherIcon";

export default class App extends Component {
  state = {};

  static propTypes = {
    city: PropTypes.string.isRequired
  };

  static defaultProps = {
    apiUrl: "https://api.openweathermap.org",
    apiKey: "87ab2c518113b309164dae566f4f3de9"
  };

  constructor(props) {
    super(props);
    this.refreshForecastFromUrl(
      this.props.apiUrl +
        "/data/2.5/forecast" +
        "?q=" +
        this.props.city +
        "&appid=" +
        this.props.apiKey +
        "&units=metric"
    );
  }

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

  displayWeek(date) {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let n = date.getDay();
    let i = 0;
    let orderedDays = [];
    for (i = 0; i < days.length; i++) {
      let weekdayIndex = (i + n) % days.length;
      orderedDays[i] = days[weekdayIndex];
    }

    return orderedDays;
  }

  tempsMaxWeek(listArray) {
    let i = 0;
    let j = 0;
    let tempMax = -100;
    let tempsMax = [];
    for (i = 0; i <= 4; i++) {
      tempMax = -100;
      for (j = i * 8; j < (i + 1) * 8 && j < listArray.length; j++) {
        if (tempMax < listArray[j].main.temp_max) {
          tempMax = listArray[j].main.temp_max;
        }
      }
      tempsMax[i] = Math.round(tempMax);
    }
    return tempsMax;
  }

  tempsMinWeek(listArray) {
    let i = 0;
    let j = 0;
    let tempMin = -100;
    let tempsMin = [];
    for (i = 0; i <= 4; i++) {
      tempMin = 100;
      for (j = i * 8; j < (i + 1) * 8 && j < listArray.length; j++) {
        if (tempMin > listArray[j].main.temp_min) {
          tempMin = listArray[j].main.temp_min;
        }
      }
      tempsMin[i] = Math.round(tempMin);
    }
    return tempsMin;
  }

  refreshForecastFromUrl(url) {
    axios.get(url).then(response => {
      this.setState({
        conditions: {
          icons: this.forecastIcon(response.data.list),
          weekday: this.displayWeek(new Date()),
          tempMax: this.tempsMaxWeek(response.data.list),
          tempMin: this.tempsMinWeek(response.data.list)
        }
      });
    });
  }

  forecastIcon(listArray) {
    let weekIcons = [];
    weekIcons[0] = listArray[4].weather[0].icon;
    weekIcons[1] = listArray[12].weather[0].icon;
    weekIcons[2] = listArray[20].weather[0].icon;
    weekIcons[3] = listArray[28].weather[0].icon;
    weekIcons[4] = listArray[36].weather[0].icon;

    return weekIcons;
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

  render() {
    if (this.state.conditions) {
      this.refreshForecastFromUrl(
        this.props.apiUrl +
          "/data/2.5/forecast" +
          "?q=" +
          this.props.city +
          "&appid=" +
          this.props.apiKey +
          "&units=metric"
      );
      return (
        <div className="weather-forecast days  clearfix col-md-12">
          <div className=" day__block forecast__block--selected">
            <div className="weekday-txt" />
            <p className="weekday-txt">{this.state.conditions.weekday[0]}</p>
            <div className="clearfix forecast-icon">
              <WeatherIcon icons={this.state.conditions.icons[0]} />
            </div>
            <p className="weather-temp weather-temp--max">
              {this.state.conditions.tempMax[0]}
              {"º "}
            </p>
            <p className="weather-temp weather-temp--min">
              {this.state.conditions.tempMin[0]}
              {"º "}
            </p>
          </div>
          <div className=" day__block">
            <p className="weekday-txt">{this.state.conditions.weekday[1]}</p>
            <div className="clearfix forecast-icon">
              <WeatherIcon icons={this.state.conditions.icons[1]} />
            </div>
            <p className="weather-temp weather-temp--max">
              {this.state.conditions.tempMax[1]}
              {"º "}{" "}
            </p>
            <p className="weather-temp weather-temp--min">
              {this.state.conditions.tempMin[1]}
              {"º "}
            </p>
          </div>
          <div className=" day__block">
            <p className="weekday-txt">{this.state.conditions.weekday[2]}</p>
            <div className="clearfix forecast-icon">
              <WeatherIcon icons={this.state.conditions.icons[2]} />
            </div>
            <p className="weather-temp weather-temp--max">
              {this.state.conditions.tempMax[2]}
              {"º "}{" "}
            </p>
            <p className="weather-temp weather-temp--min">
              {this.state.conditions.tempMin[2]}
              {"º "}
            </p>
          </div>
          <div className=" day__block">
            <p className="weekday-txt">{this.state.conditions.weekday[3]}</p>
            <div className="clearfix forecast-icon">
              <WeatherIcon icons={this.state.conditions.icons[3]} />
            </div>
            <p className="weather-temp weather-temp--max">
              {this.state.conditions.tempMax[3]}
              {"º "}{" "}
            </p>
            <p className="weather-temp weather-temp--min">
              {this.state.conditions.tempMin[3]}
              {"º "}
            </p>
          </div>
          <div className=" day__block">
            <p className="weekday-txt">{this.state.conditions.weekday[4]}</p>
            <div className="clearfix forecast-icon">
              <WeatherIcon icons={this.state.conditions.icons[4]} />
            </div>
            <p className="weather-temp weather-temp--max">
              {this.state.conditions.tempMax[4]}
              {"º "}
            </p>
            <p className="weather-temp weather-temp--min">
              {this.state.conditions.tempMin[4]}
              {"º "}
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          App is loading, <em>please wait...</em>
        </div>
      );
    }
  }
}
