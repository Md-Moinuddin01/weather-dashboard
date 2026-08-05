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

let cityTimezoneOffset = 0;
let dateTimeInterval = null;

const demoWeatherData = {
  name: "India",
  sys: { country: "GB" },
  main: {
    temp: 18,
    feels_like: 17,
    humidity: 64,
    pressure: 1014,
  },
  wind: { speed: 4.2 },
  visibility: 10000,
  timezone: 0,
  weather: [
    {
      icon: "10d",
      description: "light rain",
    },
  ],
};

const demoForecastData = {
  list: [
    {
      dt_txt: "2026-08-05 12:00:00",
      main: { temp: 18 },
      weather: [{ icon: "10d", description: "light rain" }],
    },
    {
      dt_txt: "2026-08-06 12:00:00",
      main: { temp: 20 },
      weather: [{ icon: "04d", description: "broken clouds" }],
    },
    {
      dt_txt: "2026-08-07 12:00:00",
      main: { temp: 22 },
      weather: [{ icon: "01d", description: "clear sky" }],
    },
    {
      dt_txt: "2026-08-08 12:00:00",
      main: { temp: 21 },
      weather: [{ icon: "02d", description: "few clouds" }],
    },
    {
      dt_txt: "2026-08-09 12:00:00",
      main: { temp: 19 },
      weather: [{ icon: "10d", description: "light rain" }],
    },
  ],
};
