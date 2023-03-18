import React from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import MapCategoryMarkers from "./MapCategoryMarkers";

function Map({lat, lon, categoryResponse}) {

    
    return (
        <div>
            <MapContainer 
            center={lat && lon != 0 ? [lat, lon] : [51.509865, -0.118092]} 
            zoom={12}
            scrollWheelZoom={false}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapCategoryMarkers categoryResponse={categoryResponse} />
            </MapContainer>
        </div>
    )
};

export default Map;