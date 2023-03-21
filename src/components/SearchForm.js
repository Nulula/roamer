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
      <form className="form-group row gx-2 align-items-center justify-content-center">
        <div className="col-sm-11 col-lg-4">
          <input
            className="form-control"
            type="text"
            id="cityInput"
            aria-describedby="city"
            placeholder="Enter city"
            value={cityValue}
            onChange={handleCityChange}
          />
        </div>
  
        <div className="col-sm-11 col-lg-4">
          <select
            className="form-select"
            id="dropdown-field"
            value={countryValue}
            onChange={handleCountryChange}
          >
            <option defaultValue>Country</option>
            {countries.map((country) => (
              <option key={country.value} value={country.key}>
                {country.value}
              </option>
            ))}
          </select>
        </div>
        <div className="col-sm-auto col-lg-auto">
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
          Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchForm;
