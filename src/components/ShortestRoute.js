import React from 'react';
import { GeoJSON } from 'react-leaflet';

const lineStyle = {
    "color": "purple",
    "weight": 5,
    "opacity": 0.5
};

function ShortestRoute({shortestRouteRes,counter}) {
    return !shortestRouteRes ? null: (
    <>
        <GeoJSON key={counter} data={shortestRouteRes} style={lineStyle}/>
    </>
    )
};

export default ShortestRoute;