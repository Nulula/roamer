import React, { useState, useEffect } from 'react';

const SearchForm = ({Countries}) => {
    const [cityValue,setCityValue] = useState("");
    const [countryValue,setCountryValue] = useState("");

    const handleCityChange = (event) => {
        setCityValue(event.target.value);
    };

    const handleCountryChange = (event) => {
        setCountryValue(event.target.value);
    };

    useEffect(() => {
        console.log(countryValue)
    });

    return(
        <>
            <div className="form-group">
                <label htmlFor="cityInput">City:</label>
                <input type="text" id="cityInput" aria-describedby="city" placeholder="Enter city" value={cityValue} onChange={handleCityChange} />
            </div>
            <div className="form-group">
                <label htmlFor="dropdown-field">Country:</label>
                <select id="dropdown-field" value={countryValue} onChange={handleCountryChange}>
                    {Countries.map((country) => (
                        <option key={country.value} value={country.key}>
                            {country.value}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>        
    </>
    )

};

export default SearchForm;