import axios from "axios";

var API = process.env.REACT_APP_API_RASA_URL
  ? process.env.REACT_APP_API_RASA_URL
  : "https://staging-moneypal-server.rnssol.com/";

export const ipAPI = "https://ipwhois.app/json/";

export default axios.create({
  baseURL: API,
  responseType: "json",
});
