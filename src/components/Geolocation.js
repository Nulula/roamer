import React, { useState, useEffect } from 'react';
import SearchCategories from './SearchCategories';
import Map from './Map';
import Weather from './Weather';
import GeoApi from '../utils/GeoApi';

function Geolocation() {
    const [latitude,setLatitude] = useState(null);
    const [longitude,setLongitude] = useState(null);
    const [categoryValue,setCategoryValue] = useState("accommodation");
    const [categorySearchValue,setCategorySearchValue] = useState("");
    const [startP,setStartP] = useState("");
    const [searching, setSearching] = useState(false);
    const [categoryResponse, setCategoryResponse] = useState();


     //API call for categories
     useEffect(() => {
        if (!searching || !latitude) {
            return;
        }
        const newStartP = `${longitude},${latitude}`;
        setStartP(newStartP);

        GeoApi.searchPlace(categorySearchValue, startP)
        .then((res) => {
            console.log(res);
            setCategoryResponse(res.data.features);
        })
        .catch(error => console.log(error));
    }, [searching,startP,longitude,latitude,categorySearchValue]);



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


    //search form for map categories functions
    const handleCategoryChange = (event) => {
        setCategoryValue(event.target.value);
    };

    const handleCategorySubmit = event => {
        event.preventDefault();
        setCategorySearchValue(categoryValue);
        setCategoryValue("");
        setSearching(true)
    };

    if (!latitude) {
        return (
            <button type="submit" className="btn btn-primary" id="nearMeButton" onClick={handleClick}>Click to find your location</button>
        )
    } else {
        return (
            <>
                <SearchCategories 
                        categoryValue={categoryValue}
                        handleCategoryChange={handleCategoryChange}
                        handleCategorySubmit={handleCategorySubmit}
                        />
                  <Map lat={latitude} lon={longitude} key={[latitude,longitude]} categoryResponse={categoryResponse}/>
                  <Weather lat={latitude} lon={longitude} />
            </>
        )
    }
};

export default Geolocation;