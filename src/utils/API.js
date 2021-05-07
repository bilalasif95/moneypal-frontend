import axios from "axios";

var API = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : "https://staging-moneypal-backend.rnssol.com/";

export default axios.create({
  baseURL: API,
  responseType: "json",
});
