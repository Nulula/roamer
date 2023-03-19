import React from "react";
import countries from "./Countries";

const SearchForm = ({
  countryValue,
  cityValue,
  handleCityChange,
  handleCountryChange,
  handleSubmit,
}) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor="cityInput">City:</label>
        <input
          type="text"
          id="cityInput"
          aria-describedby="city"
          placeholder="Enter city"
          value={cityValue}
          onChange={handleCityChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="dropdown-field">Country:</label>
        <select
          id="dropdown-field"
          value={countryValue}
          onChange={handleCountryChange}
        >
          <option defaultValue>Select country</option>
          {countries.map((country) => (
            <option key={country.value} value={country.key}>
              {country.value}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
};

export default SearchForm;
