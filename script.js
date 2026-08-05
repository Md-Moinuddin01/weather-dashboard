const apiKey = "88f0f1d0371eda93cb6fbdb92c26f129";
const defaultCity = "India";

const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const locationBtn = document.getElementById("locationBtn");
const loadingState = document.getElementById("loadingState");
const errorMessage = document.getElementById("errorMessage");
const forecastGrid = document.getElementById("forecastGrid");

const cityNameEl = document.getElementById("currentWeatherTitle");
const dateTimeEl = document.getElementById("dateTime");
const temperatureEl = document.getElementById("temperature");
const weatherDescriptionEl = document.getElementById("weatherDescription");
const feelsLikeEl = document.getElementById("feelsLike");
const humidityEl = document.getElementById("humidity");
const windSpeedEl = document.getElementById("windSpeed");
const pressureEl = document.getElementById("pressure");
const visibilityEl = document.getElementById("visibility");
const weatherIconEl = document.getElementById("weatherIcon");
