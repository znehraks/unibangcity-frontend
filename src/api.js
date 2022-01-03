import axios from "axios";
const api = axios.create({
  // baseURL: "http://localhost:4000/",
  baseURL: "https://unibangcity-backend.herokuapp.com/",
});

//api 모아두기
export const Api = {
  getResidence: (answers) => api.post(`/recommendation`, answers),

  saveResult: (
    univ_name,
    univ_lat,
    univ_lon,
    scrapper_code,
    rank01_T,
    rank02_T,
    rank03_T,
    rank04_T,
    rank05_T,
    avg_T
  ) =>
    api.post(`/recommendation/create`, {
      univ_name,
      univ_lat,
      univ_lon,
      scrapper_code,
      rank01_T,
      rank02_T,
      rank03_T,
      rank04_T,
      rank05_T,
      avg_T,
    }),
};
