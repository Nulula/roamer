import React from "react";
import { Marker, Popup } from "react-leaflet";

function MapCategoryMarkers({categoryResponse}) {

    return !categoryResponse ? null : (
        <>
        {categoryResponse.map((place, index) => (
            <Marker 
            key={`marker-${index}`} 
            position={[place.geometry.coordinates[1], place.geometry.coordinates[0]]}>
            </Marker>
          ))}
          </>
    )
}

export default MapCategoryMarkers;