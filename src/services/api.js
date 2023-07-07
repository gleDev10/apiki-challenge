import axios from "axios";
const api = axios.create({
  baseURL: "https://blog.apiki.com/wp-json/wp/v2",
});

export const getPosts = (url) => {
  return api.get(url);
};

export default api;
