import axios from "axios";
// require('dotenv');

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
  // baseURL: "http://localhost:8080/api/trends"
});