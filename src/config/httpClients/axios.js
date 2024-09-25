import axios from "axios";


// ------- Setting for Axios -------
export function api() {
  var user = localStorage.getItem("jwtToken");

  const api = axios.create({
    baseURL: "https://localhost:44319/api/",
    headers: {
      Authorization: !user ? null : 'Bearer ' + user.replace(/['"]+/g, '')
    }
  });

  return api;
}