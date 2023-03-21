import React, { useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";

function MapCategoryMarkers({categoryResponse,handleStartPointChange,handleFinishPointChange}) {

    const [startPoint,setStartPoint] = useState("");
    const [finishPoint,setFinishPoint] = useState("");

    // useEffect(() => {
    //     console.log("Start point updated:", startPoint);
    //     console.log("Finish point updated:", finishPoint);
    //   }, [startPoint, finishPoint]);
    
    return !categoryResponse ? null : (
        <>
        {categoryResponse.map((place, index) => (
            <Marker 
            key={`marker-${index}`} 
            position={[place.geometry.coordinates[1], place.geometry.coordinates[0]]}
            >
                <Popup>
                    <span>{index + 1}. {place.properties.name}</span><br />
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