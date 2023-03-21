import axios from "axios";

//main call information
const BASEURL = "https://api.geoapify.com/";
const APIKEY = "&apiKey=8f4690110c99450d8e8c77713b77c534";

//bits to call for a map
//this needs a city and a country
//example call for map: https://api.geoapify.com/v1/geocode/search?city=london&country=gb&limit=1&format=json&apiKey=8f4690110c99450d8e8c77713b77c534
const mapCall1 = "v1/geocode/search?city=";
const mapCall2 = "&country=";
const mapCall3 = "&limit=1&format=json";

//bits to call for shortest route
//this needs a "start" passed as 34.456,23.456 (a string?) and "finish" passed as 34.456,23.456 (a string?)
//example call for route: https://api.geoapify.com/v1/routing?waypoints=50.679023,4.569876|50.66170,4.578667&mode=drive&apiKey=8f4690110c99450d8e8c77713b77c534
const routeCall1 = "v1/routing?waypoints=";
const routeCall2 = "|";
const routeCall3 = "&mode=walk";

//bits to call for nearest places of interest
//this needs a "category" and a point passed as 34.456,23.456 (a string?)
//it needs a radius (in placesCall3 => 1000m)
//it needs a limit of returned results (in placesCall 4 => 20)
//the bias parameter lets to sort results by distance to the given location
//example call for route: https://api.geoapify.com/v2/places?categories=accommodation&filter=circle:-0.07071648508463113,51.50848194136378,1000&bias=proximity:-0.07071648508463113,51.50848194136378&limit=20&apiKey=8f4690110c99450d8e8c77713b77c534

const placesCall1 = "v2/places?categories=";
const placesCall2 = "&filter=circle:";
const placesCall3 = ",1000";
const placesCall4 = "&limit=20";

// &bias=proximity:

export default {
    searchMap: function(city, country) {
        return axios.get(BASEURL + mapCall1 + city + mapCall2 + country + mapCall3 + APIKEY)
    },

    searchRoute: function(start, finish) {
        return axios.get(BASEURL + routeCall1 + start + routeCall2 + finish + routeCall3 + APIKEY)
    },

    searchPlace: function(category, point) {
        return axios.get(BASEURL + placesCall1 + category + placesCall2 + point + placesCall3 + placesCall4 + APIKEY)
    }

}