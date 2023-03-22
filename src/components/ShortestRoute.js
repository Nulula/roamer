import React from 'react';
import { GeoJSON } from 'react-leaflet';

const lineStyle = {
    "color": "purple",
    "weight": 5,
    "opacity": 0.5
};

function ShortestRoute({shortestRouteRes}) {
    return !shortestRouteRes ? null: (
    <>
        <GeoJSON data={shortestRouteRes} style={lineStyle}/>
    </>
    )
};

export default ShortestRoute;