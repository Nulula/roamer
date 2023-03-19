import React, { useState, useEffect } from "react";
import GeoAPI from "../utils/GeoApi";
import Map from "./Map";
import Weather from "./Weather";
import SearchForm from "./SearchForm";
import SearchCategories from "./SearchCategories";

function WrapperForSearch() {
    // Setting states
    const [search, setSearch] = useState({
        city: "",
        country: ""
    });
    const [cityValue,setCityValue] = useState("");
    const [countryValue,setCountryValue] = useState("");
    const [coordinates, setCoordinates] = useState({
        lat: 0,
        lon: 0,
        key: ""
    });
    const [categoryValue,setCategoryValue] = useState("accommodation");
    const [categorySearchValue,setCategorySearchValue] = useState("");
    const [startP,setStartP] = useState("");
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
        GeoAPI.searchMap(cityC, countryC)
        .then((res) => {
            console.log("Res" + res.data.results[0].lat);
            setCoordinates({
                lat: res.data.results[0].lat,
                lon: res.data.results[0].lon,
                key: res.data.results[0].place_id,
            });

        })
        .catch(error => console.log(error));
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
            GeoAPI.searchPlace(categorySearchValue, startP)
            .then((res) => {
                console.log(res);
                setCategoryResponse(res.data.features);
            })
            .catch(error => console.log(error));
        }, [searching,startP,coordinates.key,categorySearchValue]);

    // Search form functions
    const handleCityChange = (event) => {
        setCityValue(event.target.value);
    };

    const handleCountryChange = (event) => {
        setCountryValue(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        setSearch({
            city: cityValue,
            country: countryValue
        });
        setSearching(false)
    };

    //search form for map categories functions
    const handleCategoryChange = (event) => {
        setCategoryValue(event.target.value);
    };

    const handleCategorySubmit = event => {
        event.preventDefault();
        setCategorySearchValue(categoryValue);
        setCategoryValue("");
        setSearching(true)
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
        <SearchCategories 
            categoryValue={categoryValue}
            handleCategoryChange={handleCategoryChange}
            handleCategorySubmit={handleCategorySubmit}
            />
      <Map lat={coordinates.lat} lon={coordinates.lon} key={coordinates.key} categoryResponse={categoryResponse}/>
      <Weather lat={coordinates.lat} lon={coordinates.lon} />
    </div>
  );
}

export default WrapperForSearch;
