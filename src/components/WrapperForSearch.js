import React, { useState, useEffect } from "react";
import axios from "axios";
import GeoAPI from "../utils/GeoApi";
import Map from "./Map";
import Weather from "./Weather";
import SearchForm from "./SearchForm";


function WrapperForSearch() {
    // Setting states for search form input, search term for API call, and location info
    const [formInputs, setFormInputs] = useState({
        city: "",
        country: ""
    });
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

    useEffect(() => {
        console.log(coordinates);
    }, []);

    // API Call for location
    const searchCoordinates = () => {
        axios.get("https://api.geoapify.com/v1/geocode/search?city=" + search.city + "&country=" + search.country + "&limit=1&format=json&apiKey=8f4690110c99450d8e8c77713b77c534")
        .then((res) => {
            console.log(res);
            setCoordinates({
                lat: res.data.results[0].lat,
                lon: res.data.results[0].lon,
                key: res.data.results[0].place_id,
            });
        })
        .catch(err => console.log(err));
    }

    // Form functions
    // const handleInputChange = event => {setInput(event.target.value)}

    const handleCityChange = (event) => {
        setCityValue(event.target.value);
    };

    const handleCountryChange = (event) => {
        setCountryValue(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        setFormInputs({
            city: cityValue,
            country: countryValue
        });
        setSearch({
            city: formInputs.city,
            country: formInputs.country
        });
        setCityValue("");
        setCountryValue("");
    };


    return (
        <div>
            <button onClick={searchCoordinates}>Click for API call</button>
            <SearchForm cityValue={cityValue}
            countryValue={countryValue}
            handleCityChange={handleCityChange}
            handleCountryChange={handleCountryChange}
            handleSubmit={handleSubmit}/>

            {/* <Map cityName={location.cityName}
            lat={location.lat}
            lon={location.lon}
            key={location.key} /> */}
        </div>
    )
};

export default WrapperForSearch;