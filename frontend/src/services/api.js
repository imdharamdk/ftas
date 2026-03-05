import axios from "axios";

const API = axios.create({
  baseURL: "https://ftas-api.onrender.com/api"
});

export const getSignals = () => API.get("/signals");

export const getTopVolume = () => API.get("/coins/volume");

export const getGainers = () => API.get("/coins/gainers");

export const getLosers = () => API.get("/coins/losers");

export const getVolatile = () => API.get("/coins/volatile");
