import React from "react";
import { Marker, Popup } from "react-leaflet";

function MapCategoryMarkers({categoryResponse,handleStartPointChange,handleFinishPointChange}) {

    return !categoryResponse ? null : (
        <>
        {categoryResponse.map((place, index) => (
            <Marker 
            key={`marker-${index}`} 
            position={[place.geometry.coordinates[1], place.geometry.coordinates[0]]}
            >
                <Popup>
                    <span>{index + 1}. {place.properties.address_line1}</span><br />
                    <button className="btn btn-primary" onClick={() => handleStartPointChange(`${place.geometry.coordinates[1]},${place.geometry.coordinates[0]}`)
                    }>Start</button>
                    <button className="btn btn-primary" onClick={() => handleFinishPointChange(`${place.geometry.coordinates[1]},${place.geometry.coordinates[0]}`)
                    }>Finish</button>
                </Popup>
            </Marker>
          ))}
          </>
    )
}

export default MapCategoryMarkers;