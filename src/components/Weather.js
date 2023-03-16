import React from "react";
import WeatherApi from "../utils/WeatherApi";
import { useState, useEffect } from "react";

function Weather(props) {
  const lat = props.lat;
  const lon = props.lon;
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
    console.log(lat);
    console.log(lon);
    WeatherApi.searchWeather(51.5072, -0.118092)
      .then((res) => {
        // console.log(res);
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
  }, []);

  useEffect(() => {
    WeatherApi.serchFutureWeather(51.5072, -0.118092)
      .then((res) => {
        console.log(res);
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
  }, []);

  return (
    <div className="cardContainer">
      <div className="card" style={{ width: "16rem" }}>
        <div className="card-body">
          <h1>Weather in {weather.cityName}</h1>
          <img src={weather.urlIcon} alt={weather.clouds}></img>
          <p>
            {weather.clouds.charAt(0).toUpperCase() + weather.clouds.slice(1)}
          </p>
          <p>Temperature {weather.temperatutre} C°</p>
          <p>Feels Like {weather.feelsLike} C°</p>
          <p>Wind Speed {weather.wind} m/s</p>
          <p>Humidity {weather.humidity} %</p>
        </div>
      </div>
      <div className="card" style={{ width: "16rem" }}>
        <div className="card-body">
          <h1>Weather in {futureWeather.cityName} in 3 hours</h1>
          <img src={futureWeather.urlIcon} alt={futureWeather.clouds}></img>
          <p>
            {futureWeather.clouds.charAt(0).toUpperCase() +
              futureWeather.clouds.slice(1)}
          </p>
          <p>Temperature {futureWeather.temperatutre} C°</p>
          <p>Feels Like {futureWeather.feelsLike} C°</p>
          <p>Wind Speed {futureWeather.wind} m/s</p>
          <p>Humidity {futureWeather.humidity} %</p>
        </div>
      </div>
    </div>
  );
}
export default Weather;
