import React, { useState, useEffect } from "react";
import GeoApi from "../utils/GeoApi";
import Map from "./Map";
import Weather from "./Weather";
import SearchForm from "./SearchForm";
import SearchCategories from "./SearchCategories";
import PlacesInfo from "./PlacesInfo";
import logo from "../assets/Roamer_Logo.png";
import ShortestRoute from "./ShortestRoute";

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
  const [categoryValue, setCategoryValue] = useState("");
  const [categorySearchValue, setCategorySearchValue] = useState("");
  const [startP, setStartP] = useState("");
  const [searching, setSearching] = useState(false);
  const [categoryResponse, setCategoryResponse] = useState();
  const [startPoint, setStartPoint] = useState("");
  const [finishPoint, setFinishPoint] = useState("");
  const [shortestRouteRes,setShortestRouteRes] = useState("");
  const [counter,setCounter] = useState(1);

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
          lat: res.data.results[0].lat,
          lon: res.data.results[0].lon,
          key: res.data.results[0].place_id,
        });
      })
      .catch((error) => console.log(error));
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

  //API call for the shortest route
  useEffect(() => {
    if (!startPoint || !finishPoint) {
      return;
    }
    GeoApi.searchRoute(startPoint,finishPoint)
      .then((res) => {
        setShortestRouteRes(res.data.features);
        setCounter(counter+1)
      })
      .catch((error) => console.log(error));
  },[startPoint,finishPoint])

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
    setSearching(true);
  };

    //search parameters for the shortest route
    const handleStartPointChange = (newStartPoint) => {
      setStartPoint(newStartPoint);
    };
  
    const handleFinishPointChange = (newFinishPoint) => {
      setFinishPoint(newFinishPoint);
    };

  if (!coordinates.key) {
    return (
      <div className="text-center">
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
    );
  } else {
    return (
      <div>
        <SearchForm
          cityValue={cityValue}
          countryValue={countryValue}
          handleCityChange={handleCityChange}
          handleCountryChange={handleCountryChange}
          handleSubmit={handleSubmit}
        />
        <SearchCategories
          categoryValue={categoryValue}
          handleCategoryChange={handleCategoryChange}
          handleCategorySubmit={handleCategorySubmit}
        />
        <PlacesInfo data={categoryResponse} />
  
        <Map
          lat={coordinates.lat}
          lon={coordinates.lon}
          key={coordinates.key}
          categoryResponse={categoryResponse}
          handleStartPointChange={handleStartPointChange}
          handleFinishPointChange={handleFinishPointChange}
          shortestRouteRes={shortestRouteRes}
          counter={counter}      />
        <Weather lat={coordinates.lat} lon={coordinates.lon} />
      </div>
    );
  }
}

export default WrapperForSearch;
