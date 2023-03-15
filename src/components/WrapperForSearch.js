import React, { useState, useEffect } from "react";
import GeoAPI from "../utils/GeoApi";
import Map from "./Map";
import Weather from "./Weather";
import axios from "axios";


function WrapperForSearch() {
    // Setting states for search form input, search term for API call, and location info
    const [input, setInput] = useState();
    const [search, setSearch] = useState();
    const [location, setLocation] = useState({
        cityName: "",
        countryCode: "",
        lat: 0,
        lon: 0,
        key: ""
    });

    // API Call for location
    const searchLocation = () => {
        axios.get("https://api.geoapify.com/v1/geocode/search?city=Paris&country=FR&limit=1&format=json&apiKey=8f4690110c99450d8e8c77713b77c534")
        .then((res) => {
            console.log(res);
            setLocation({
                ...location,
                cityName: res.data.results[0].city,
                lat: res.data.results[0].lat,
                lon: res.data.results[0].lon,
                key: res.data.results[0].place_id,
            });
        })
        .catch(err => console.log(err));
    }

    // Form functions
    const handleInputChange = event => {setInput(event.target.value)}

    const handleSubmit = event => {
        event.preventDefault();
        setSearch(input);
        setInput("");
    };

    return (
        <div>
            <button onClick={searchLocation}>Click for API call</button>
            {/* <SearchForm input={input}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}/>

            <Map cityName={location.cityName}
            lat={location.lat}
            lon={location.lon}
            key={location.key} /> */}
        </div>
    )
};

export default WrapperForSearch;