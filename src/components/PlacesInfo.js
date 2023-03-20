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
      <ol>
        {places.map((place) => {
          return (
            <li key={place.properties.datasource.raw.osm_id}>
              <h2>{place.properties.address_line1}</h2>
              <p>{place.properties.address_line2}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
export default PlacesInfo;
