import axios from "axios";


export default axios.create({
  baseURL: "https://cloud-11-backend.herokuapp.com/api/trends/"
  // baseURL: "http://localhost:8080/api/trends"
});