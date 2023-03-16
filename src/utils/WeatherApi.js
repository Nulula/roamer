import axios from "axios";

const BASEURL = "https://api.openweathermap.org/data/2.5/weather?";
const BASEURLfuture = "https://api.openweathermap.org/data/2.5/forecast?";
const APIKEY = "&appid=e5d92f08ca1eeb7ebd94f78928323033&units=metric";

export default {
  searchWeather: function (lat, lon) {
    return axios.get(BASEURL + `lat=${lat}&lon=${lon}` + APIKEY);
  },
  serchFutureWeather: function (lat, lon) {
    return axios.get(BASEURLfuture + `lat=${lat}&lon=${lon}` + APIKEY);
  },
};
