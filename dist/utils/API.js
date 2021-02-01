import axios from "axios";
export default axios.create({
  baseURL: "http://192.168.100.14:8000/",
  responseType: "json"
});