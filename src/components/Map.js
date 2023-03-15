import React from "react";
import { MapContainer, TileLayer } from 'react-leaflet';

function Map() {
    
    return (
        <div>
            <MapContainer 
            center={[51.505, -0.09]} 
            zoom={12}
            scrollWheelZoom={false}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </MapContainer>
        </div>
    )
};

export default Map;