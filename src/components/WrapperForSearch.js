import React, { useState, useEffect } from "react";

function WrapperForSearch() {
    // Setting states for search form input, search term for API call, and location info
    const [input, setInput] = useState();
    const [search, setSearch] = useState();
    const [location, setLocation] = useState({
        cityName: "",
        lat: 0,
        lon: 0,
        key: ""
    });

    //Form functions
    const handleInputChange = event => {setInput(event.target.value)}

    const handleSubmit = event => {
        event.preventDefault();
        setSearch(input);
        setInput("");
    };

    return (
        <div>
            <SearchForm input={input}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}/>

            <Map cityName={location.cityName}
            lat={location.lat}
            lon={location.lon}
            key={location.key} />
        </div>
    )
};

export default WrapperForSearch;