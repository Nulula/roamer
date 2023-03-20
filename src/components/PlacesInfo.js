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
    <div>
      {/* <h1>Your search reasults:</h1> */}
      <div className="placesList">
        <ul>
          {places.map((place) => {
            return (
              <li key={place.properties.datasource.raw.osm_id}>
                <h2>{place.properties.address_line1}</h2>
                <p>{place.properties.address_line2}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
export default PlacesInfo;
