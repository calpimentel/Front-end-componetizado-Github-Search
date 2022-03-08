import axios from "axios";

// Usando o Axios para consumir a API do github
const api = axios.create({
  baseURL: "https://api.github.com/",
});

export default api;
