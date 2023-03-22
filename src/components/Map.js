import React from "react";
import L, { MapContainer, TileLayer } from 'react-leaflet';
import MapCategoryMarkers from "./MapCategoryMarkers";
import ShortestRoute from './ShortestRoute';

function Map({lat, lon, categoryResponse,handleStartPointChange,handleFinishPointChange,shortestRouteRes,counter}) {

    
    return (
        <div>
            <MapContainer 
            center={lat && lon !== 0 ? [lat, lon] : [51.509865, -0.118092]} 
            zoom={15}
            scrollWheelZoom={false}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapCategoryMarkers categoryResponse={categoryResponse}           handleStartPointChange={handleStartPointChange}
                handleFinishPointChange={handleFinishPointChange} />
                <ShortestRoute
                shortestRouteRes={shortestRouteRes}
                counter={counter}
                />
            
            </MapContainer>
        </div>
    )
};

export default Map;