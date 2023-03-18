import React, { useState } from 'react';

function Geolocation() {
    const [latitude,setLatitude] = useState(null);
    const [longitude,setLongitude] = useState(null);

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

    return (
        <>
            <button type="submit" className="btn btn-primary" id="nearMeButton" onClick={handleClick}>Near Me</button>
        </>
    )
};

export default Geolocation;