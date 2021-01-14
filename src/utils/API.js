import axios from "axios";

var API = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : "http://192.168.100.14:8000/";


console.log("API", API)

export default axios.create({
  baseURL: API,
  responseType: "json",
});
