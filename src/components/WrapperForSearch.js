import React, { useState, useEffect } from "react";
import GeoApi from "../utils/GeoApi";
import Map from "./Map";
import Weather from "./Weather";
import SearchForm from "./SearchForm";
import SearchCategories from "./SearchCategories";
import PlacesInfo from "./PlacesInfo";
import logo from "../assets/Roamer_Logo.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function WrapperForSearch() {
  // Setting states
  const [search, setSearch] = useState({
    city: "",
    country: "",
  });
  const [cityValue, setCityValue] = useState("");
  const [countryValue, setCountryValue] = useState("");
  const [coordinates, setCoordinates] = useState({
    cityName: "",
    lat: 0,
    lon: 0,
    key: "",
  });
  const [categoryValue, setCategoryValue] = useState("");
  const [categorySearchValue, setCategorySearchValue] = useState("");
  const [startP, setStartP] = useState("");
  const [searching, setSearching] = useState(false);
  const [categoryResponse, setCategoryResponse] = useState();

  // Function runs every time the search state changes
  useEffect(() => {
    if (!search.city && !search.country) {
      return;
    }
    const cityC = search.city;
    const countryC = search.country;

    // API Call for location
    GeoApi.searchMap(cityC, countryC)
      .then((res) => {
        console.log("Res" + res.data.results[0].lat);
        setCoordinates({
          cityName: res.data.results[0].city,
          lat: res.data.results[0].lat,
          lon: res.data.results[0].lon,
          key: res.data.results[0].place_id,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          `Sorry, ${cityC} was not found in ${countryC}.\nPlease check if city name and country is correct.`
        );
      });
  }, [search]);

  useEffect(() => {
    if (!coordinates.lat || !coordinates.lon) {
      return;
    }

    const newStartP = `${coordinates.lon},${coordinates.lat}`;
    setStartP(newStartP);
  }, [coordinates]);
  //API call for categories
  useEffect(() => {
    if (!searching || !coordinates.key) {
      return;
    }
    GeoApi.searchPlace(categorySearchValue, startP)
      .then((res) => {
        console.log(res);
        setCategoryResponse(res.data.features);
      })
      .catch((error) => console.log(error));
  }, [searching, startP, coordinates.key, categorySearchValue]);

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
    setSearching(false);
  };

  //search form for map categories functions
  const handleCategoryChange = (event) => {
    setCategoryValue(event.target.value);
  };

  const handleCategorySubmit = (event) => {
    event.preventDefault();
    setCategorySearchValue(categoryValue);
    setCategoryValue("");
    setCityValue("");
    setCountryValue("");
    setSearching(true);
  };

  if (!coordinates.key) {
    return (
      <div className="home-container">
        <div className="home-search-form text-center">
          <img src={logo} alt="Roamer logo - a boot with the brand name Roamer underneath"></img>
          <p>Search for a city below, or click 'Near Me' to search your current area.</p>
          <SearchForm
            cityValue={cityValue}
            countryValue={countryValue}
            handleCityChange={handleCityChange}
            handleCountryChange={handleCountryChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="row">
        <h1 className="page-title">Currently Roaming: {!coordinates.key ? "London" : coordinates.cityName}</h1>
        <div className="col-lg-8">
          <Map 
            lat={coordinates.lat} 
            lon={coordinates.lon} 
            key={coordinates.key} 
            categoryResponse={categoryResponse} 
          />
        </div>
        <div className="col-lg-4 side-panel">
          <div className="city-search">
            <h3>Search a city</h3>
            <SearchForm
              cityValue={cityValue}
              countryValue={countryValue}
              handleCityChange={handleCityChange}
              handleCountryChange={handleCountryChange}
              handleSubmit={handleSubmit}
            />
          </div>
          <div className="category-search">
            <h3>What do you want to do?</h3>
              <SearchCategories 
                categoryValue={categoryValue}
                handleCategoryChange={handleCategoryChange}
                handleCategorySubmit={handleCategorySubmit}
              />
          </div>
          <div className="places-list-container">
            <PlacesInfo data={categoryResponse} />
          </div>
          <Weather lat={coordinates.lat} lon={coordinates.lon} />
        </div>
      </div>
    );
  }
}

export default WrapperForSearch;
