import axios from "axios";

const api = axios.create({
  baseURL: "https://moviedatabase-zies.onrender.com",
});

export function loginUser(userData) {
  return api.post("/auth/login", userData);
}

export function registerUser(userData) {
  return api.post("/auth/register", userData);
}