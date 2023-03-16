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
        country: ""
    });
    const [cityValue,setCityValue] = useState("");
    const [countryValue,setCountryValue] = useState("");
    const [coordinates, setCoordinates] = useState({
        lat: 0,
        lon: 0,
        key: ""
    });

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
        setCityValue("");
        setCountryValue("");
    };


    return (
        <div>
            <SearchForm cityValue={cityValue}
            countryValue={countryValue}
            handleCityChange={handleCityChange}
            handleCountryChange={handleCountryChange}
            handleSubmit={handleSubmit}/>

            {/* <Map 
            lat={coordinates.lat}
            lon={coordinates.lon}
            key={coordinates.key} /> */}

            {/* <Weather lat={coordinates.lat}
            lon={coordinates.lon}
            key={coordinates.key} /> */}
        </div>
    )
};

export default WrapperForSearch;