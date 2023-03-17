import React from "react";
import WeatherApi from "../utils/WeatherApi";
import { useState, useEffect } from "react";

function Weather(props) {
  let lon = props.lon;
  let lat = props.lat;

  const [weather, setWeather] = useState({
    cityName: "",
    temperatutre: 0,
    iconNr: "",
    urlIcon: ``,
    feelsLike: 0,
    clouds: "",
    wind: 0,
    humidity: 0,
  });

  const [futureWeather, setFutureWeather] = useState({
    cityName: "",
    temperatutre: 0,
    iconNr: "",
    urlIcon: ``,
    feelsLike: 0,
    clouds: "",
    wind: 0,
    humidity: 0,
  });

  useEffect(() => {
    if (!lat || !lon) {
      lat = 51.509865;
      lon = -0.118092;
    }

    // API call to get crrent weather
    WeatherApi.searchWeather(lat, lon)
      .then((res) => {
        setWeather({
          cityName: res.data.name,
          temperatutre: res.data.main.temp,
          iconNr: res.data.weather[0].icon,
          urlIcon: `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`,
          feelsLike: res.data.main.feels_like,
          clouds: res.data.weather[0].description,
          wind: res.data.wind.speed,
          humidity: res.data.main.humidity,
        });
      })
      .catch((err) => console.log("err"));

    // API to get weather in 3 hours
    WeatherApi.searchFutureWeather(lat, lon)
      .then((res) => {
        setFutureWeather({
          cityName: res.data.city.name,
          temperatutre: res.data.list[0].main.temp,
          iconNr: res.data.list[0].weather[0].icon,
          urlIcon: `http://openweathermap.org/img/wn/${res.data.list[0].weather[0].icon}@2x.png`,
          feelsLike: res.data.list[0].main.feels_like,
          clouds: res.data.list[0].weather[0].description,
          wind: res.data.list[0].wind.speed,
          humidity: res.data.list[0].main.humidity,
        });
      })
      .catch((err) => console.log("err"));
  }, [lat, lon]);

  return (
    <div className="cardContainer">
      <div className="card" style={{ width: "16rem" }}>
        <div className="card-body">
          <h3>Weather in {weather.cityName}</h3>
          <img src={weather.urlIcon} alt={weather.clouds}></img>
          <p>
            {weather.clouds.charAt(0).toUpperCase() + weather.clouds.slice(1)}
          </p>
          <p>Temperature {weather.temperatutre.toFixed(0)} C°</p>
          <p>Feels Like {weather.feelsLike.toFixed(0)} C°</p>
          <p>Wind Speed {weather.wind} m/s</p>
          <p>Humidity {weather.humidity} %</p>
        </div>
      </div>
      <div className="card" style={{ width: "16rem" }}>
        <div className="card-body">
          <h3>Weather in {futureWeather.cityName} in 3 hours</h3>
          <img src={futureWeather.urlIcon} alt={futureWeather.clouds}></img>
          <p>
            {futureWeather.clouds.charAt(0).toUpperCase() +
              futureWeather.clouds.slice(1)}
          </p>
          <p>Temperature {futureWeather.temperatutre.toFixed(0)} C°</p>
          <p>Feels Like {futureWeather.feelsLike.toFixed(0)} C°</p>
          <p>Wind Speed {futureWeather.wind} m/s</p>
          <p>Humidity {futureWeather.humidity} %</p>
        </div>
      </div>
    </div>
  );
}
export default Weather;
