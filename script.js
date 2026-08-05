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


function showLoading(isLoading) {
  loadingState.classList.toggle("hidden", !isLoading);
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

function clearError() {
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");
}

function getCityDateTime(offsetSeconds) {
  const localUtcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
  return new Date(localUtcTime + offsetSeconds * 1000);
}

function updateDateTime() {
  const cityDate = getCityDateTime(cityTimezoneOffset);
  dateTimeEl.textContent = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(cityDate);
}


function setWeatherIcon(iconCode, description) {
  weatherIconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIconEl.alt = description || "Weather icon";
}

function renderCurrentWeather(data) {
  cityTimezoneOffset = data.timezone || 0;

  cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
  temperatureEl.textContent = Math.round(data.main.temp);
  weatherDescriptionEl.textContent = data.weather[0].description;
  feelsLikeEl.textContent = `Feels like ${Math.round(data.main.feels_like)}°C`;
  humidityEl.textContent = `${data.main.humidity}%`;
  windSpeedEl.textContent = `${data.wind.speed} m/s`;
  pressureEl.textContent = `${data.main.pressure} hPa`;
  visibilityEl.textContent = `${Math.round(data.visibility / 1000)} km`;
  setWeatherIcon(data.weather[0].icon, data.weather[0].description);
  updateDateTime();

  if (dateTimeInterval) {
    clearInterval(dateTimeInterval);
  }

  dateTimeInterval = setInterval(updateDateTime, 60000);
}

function getDailyForecasts(list) {
  const dailyForecasts = [];
  const seenDates = new Set();

  for (const item of list) {
    const forecastDate = item.dt_txt.split(" ")[0];

    if (!seenDates.has(forecastDate)) {
      seenDates.add(forecastDate);
      dailyForecasts.push(item);
    }

    if (dailyForecasts.length === 5) {
      break;
    }
  }

  return dailyForecasts;
}

function renderForecast(list) {
  forecastGrid.innerHTML = "";

  const dailyForecasts = getDailyForecasts(list);

  dailyForecasts.forEach((forecast) => {
    const date = new Date(`${forecast.dt_txt.replace(" ", "T")}`);
    const dayName = new Intl.DateTimeFormat("en-GB", { weekday: "short" }).format(date);

    const card = document.createElement("article");
    card.className = "forecast-card";

    card.innerHTML = `
      <p class="forecast-day">${dayName}</p>
      <img class="forecast-icon" src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="${forecast.weather[0].description}">
      <p class="forecast-temp">${Math.round(forecast.main.temp)}°C</p>
    `;

    forecastGrid.appendChild(card);
  });
}


async function fetchWeatherData(city) {
  if (!apiKey || apiKey === "88f0f1d0371eda93cb6fbdb92c26f129") {
    if (city.toLowerCase() === defaultCity.toLowerCase()) {
      renderCurrentWeather(demoWeatherData);
      renderForecast(demoForecastData.list);
      return;
    }

    throw new Error("Please add your API key in script.js.");
  }

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

  const [weatherResponse, forecastResponse] = await Promise.all([
    fetch(weatherUrl),
    fetch(forecastUrl),
  ]);

  if (!weatherResponse.ok) {
    throw new Error("City not found. Please try another location.");
  }

  if (!forecastResponse.ok) {
    throw new Error("Forecast data could not be loaded.");
  }

  const weatherData = await weatherResponse.json();
  const forecastData = await forecastResponse.json();

  renderCurrentWeather(weatherData);
  renderForecast(forecastData.list);
}


async function loadWeather(city) {
  const trimmedCity = city.trim();

  if (!trimmedCity) {
    showError("Please enter a city name.");
    return;
  }

  showLoading(true);
  clearError();

  try {
    await fetchWeatherData(trimmedCity);
  } catch (error) {
    showError(error.message);
  } finally {
    showLoading(false);
  }
}

