import axios from "axios";

var API = process.env.REACT_APP_API_RASA_URL
  ? process.env.REACT_APP_API_RASA_URL
  : "http://61.85.154.156:4080/";

export default axios.create({
  baseURL: API,
  responseType: "json",
});
