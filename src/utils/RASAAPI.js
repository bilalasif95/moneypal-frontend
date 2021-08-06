import axios from "axios";

var API = process.env.REACT_APP_API_RASA_URL
  ? process.env.REACT_APP_API_RASA_URL
  : "https://staging-moneypal-server.rnssol.com/";

export default axios.create({
  baseURL: API,
  responseType: "json",
});
