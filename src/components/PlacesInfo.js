import React from "react";
import { useState, useEffect } from "react";

function PlacesInfo({ data }) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (!data) {
      return;
    }
    setPlaces(data);
    console.log(data);
  }, [data]);

  return (
    <div className="placesList">
      <ul>
        {places.map((place, index) => {
          return (
            <li key={index}>
              <h2>
                {index + 1}. {place.properties.address_line1}
              </h2>
              <p>{place.properties.address_line2}</p>
              <p>{place.properties.datasource.raw.phone}</p>
              <a
                href={place.properties.datasource.raw.website}
                rel="noreferrer"
                target="_blank"
              >
                {place.properties.datasource.raw.website}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default PlacesInfo;
