import React, { useState, useEffect } from "react";
import axios from "axios";
import GeoAPI from "../utils/GeoApi";
import Map from "./Map";
import Weather from "./Weather";
import SearchForm from "./SearchForm";

function WrapperForSearch() {
  // Setting states
  const [search, setSearch] = useState({
    city: "",
    country: "",
  });
  const [cityValue, setCityValue] = useState("");
  const [countryValue, setCountryValue] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    lon: 0,
    key: "",
  });

  // Function runs every time the search state changes
  useEffect(() => {
    if (!search.city && !search.country) {
      return;
    }
    // API Call for location
    axios
      .get(
        "https://api.geoapify.com/v1/geocode/search?city=" +
          search.city +
          "&country=" +
          search.country +
          "&limit=1&format=json&apiKey=8f4690110c99450d8e8c77713b77c534"
      )
      .then((res) => {
        console.log(res);
        setCoordinates({
          lat: res.data.results[0].lat,
          lon: res.data.results[0].lon,
          key: res.data.results[0].place_id,
        });
      })
      .catch((error) => console.log(error));
  }, [search]);

  // Search form functions
  const handleCityChange = (event) => {
    setCityValue(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountryValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch({
      city: cityValue,
      country: countryValue,
    });
    setCityValue("");
    setCountryValue("");
  };

  return (
    <div>
      <SearchForm
        cityValue={cityValue}
        countryValue={countryValue}
        handleCityChange={handleCityChange}
        handleCountryChange={handleCountryChange}
        handleSubmit={handleSubmit}
      />

      <Map lat={coordinates.lat} lon={coordinates.lon} key={coordinates.key} />

      <Weather
        lat={coordinates.lat}
        lon={coordinates.lon}
        key={coordinates.key}
      />
    </div>
  );
}

export default WrapperForSearch;
