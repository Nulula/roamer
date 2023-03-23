import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PlacesInfo({ data }) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (!data) {
      return;
    }
    setPlaces(data);
    console.log(data);
  }, [data]);

  // if user is not loged in he cant save to local storage
  const handleSave = (event) => {
    const sessionData = sessionStorage.getItem("userData");
    let values = JSON.parse(sessionData);
    console.log(values);
    if (!sessionData) {
      toast.error("Please log in first to save the place.");
      return;
    } else if (values.name === "") {
      toast.error("Please log in first to save the place.");
      return;
    }

    const id = parseInt(event.target.getAttribute("data-id"));
    console.log(id);
    for (let i = 0; i < places.length; i++) {
      if (places[i].properties.datasource.raw.osm_id === id) {
        const place = places[i];
        console.log(place);
        localStorage.setItem(`place-${id}`, JSON.stringify(place));
        toast.success("Item has been saved to Profile");
      }
    }
  };

  return (
    <div className="placesList">
      <ul>
        {places.map((place, index) => {
          return (
            <li key={index}>
              <h4>
                {index + 1}. {place.properties.address_line1}
              </h4>
              <p>{place.properties.address_line2}</p>
              <p>{place.properties.datasource.raw.phone}</p>
              <a
                href={place.properties.datasource.raw.website}
                rel="noreferrer"
                target="_blank"
              >
                {place.properties.datasource.raw.website}
              </a>
              <button
                className="btn btn-primary"
                data-id={place.properties.datasource.raw.osm_id}
                onClick={handleSave}
              >
                Save
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default PlacesInfo;
