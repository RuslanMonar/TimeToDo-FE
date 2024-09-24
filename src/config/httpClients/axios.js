import axios from "axios";


// ------- Setting for Axios -------
export function api() {
  var user = localStorage.getItem("user");

  const api = axios.create({
    baseURL: "https://localhost:44319/api/",
    //withCredentials: true,
    headers: {
      Authorization: !user ? null : 'Bearer ' + user.replace(/['"]+/g, '')
    }
  });
  return api;
}