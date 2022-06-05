import axios from "axios";
// require('dotenv');

console.log("process.env.REACT_APP_BASE_URL", process.env.REACT_APP_BASE_URL);

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});