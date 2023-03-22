import React, { useState, useEffect } from "react";
import GeoApi from "../utils/GeoApi";
import Map from "./Map";
import Weather from "./Weather";
import SearchCategories from "./SearchCategories";
import PlacesInfo from "./PlacesInfo";
import WrapperForSearch from "../components/WrapperForSearch";

function Geolocation() {
  // Setting states
  const [latitude,setLatitude] = useState(null);
  const [longitude,setLongitude] = useState(null);
  const [categoryValue, setCategoryValue] = useState("");
  const [categorySearchValue, setCategorySearchValue] = useState("");
  const [startP, setStartP] = useState("");
  const [searching, setSearching] = useState(false);
  const [categoryResponse, setCategoryResponse] = useState();
  const [startPoint, setStartPoint] = useState("");
  const [finishPoint, setFinishPoint] = useState("");
  const [shortestRouteRes,setShortestRouteRes] = useState("");
  const [counter,setCounter] = useState(1);

  // Checks for coordinates and sets them as the start point
  useEffect(() => {
    if (!latitude || !longitude) {
      return;
    }

    const newStartP = `${longitude},${latitude}`;
    setStartP(newStartP);
  }, [latitude, longitude]);

  //API call for categories
  useEffect(() => {
    if (!searching || !latitude) {
      return;
    }
    GeoApi.searchPlace(categorySearchValue, startP)
      .then((res) => {
        console.log(res);
        setCategoryResponse(res.data.features);
      })
      .catch((error) => console.log(error));
  }, [searching, startP, latitude, categorySearchValue]);

 //API call for the shortest route
 useEffect(() => {
  if (!startPoint || !finishPoint) {
    return;
  }
  GeoApi.searchRoute(startPoint,finishPoint)
    .then((res) => {
      setShortestRouteRes(res.data.features);
      setCounter(counter+1)
    })
    .catch((error) => console.log(error));
},[startPoint,finishPoint])

//search parameters for the shortest route
const handleStartPointChange = (newStartPoint) => {
  setStartPoint(newStartPoint);
};

const handleFinishPointChange = (newFinishPoint) => {
  setFinishPoint(newFinishPoint);
};

  // Function for the find me button
  const handleClick = () => {
    if (navigator.geolocation) { //if browser supports geolocation
      navigator.geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        error => console.log("Error!", "Geolocation is not supported, please use the search function") //this was done as sweet alerts (swal), can be done with something else)
      );
    } else {
      console.log("Error!", "Geolocation is not supported, please use the search function"); //this was done as sweet alerts (swal), can be done with something else)
    }   
  }

  // Functions for category search form
  const handleCategoryChange = (event) => {
    setCategoryValue(event.target.value);
  };

  const handleCategorySubmit = (event) => {
    event.preventDefault();
    setCategorySearchValue(categoryValue);
    setCategoryValue("");
    setSearching(true);
  };

  if (!latitude) {
    return (
      <div className="text-center">
        <p>Looking for something nearby? Click the button below to search your current location.</p>
        <button type="submit" className="btn btn-primary" id="nearMeButton" onClick={handleClick}>Find me</button>
        <br /><br />
        <p>(Make sure to click 'allow' when the browser asks to use your location)</p>
      </div>
    );
  } else {
    return (
      <div>
        <SearchCategories
          categoryValue={categoryValue}
          handleCategoryChange={handleCategoryChange}
          handleCategorySubmit={handleCategorySubmit}
        />
        <PlacesInfo data={categoryResponse} />
  
        <Map
          lat={latitude}
          lon={longitude}
          key={[latitude, longitude]}
          categoryResponse={categoryResponse}
          handleStartPointChange={handleStartPointChange}
          handleFinishPointChange={handleFinishPointChange}
          shortestRouteRes={shortestRouteRes}
          counter={counter}   
        />
        <Weather lat={latitude} lon={longitude} />
      </div>
    );
  }
}

export default Geolocation;