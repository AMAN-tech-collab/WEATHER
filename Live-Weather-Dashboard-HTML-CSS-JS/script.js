// SkyCast Live Weather Dashboard
// Weather data: Open-Meteo (free, no API key required)

const API = {
  geocoding: "https://geocoding-api.open-meteo.com/v1/search",
  forecast: "https://api.open-meteo.com/v1/forecast"
};

const form = document.querySelector("#search-form");
const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search-button");
const statusMessage = document.querySelector("#status");
const weatherContent = document.querySelector("#weather-content");
const loadingOverlay = document.querySelector("#loading-overlay");
const forecastGrid = document.querySelector("#forecast-grid");

const weatherTypes = {
  0:  { label: "Clear sky", icon: "☀️" },
  1:  { label: "Mainly clear", icon: "🌤️" },
  2:  { label: "Partly cloudy", icon: "⛅" },
  3:  { label: "Overcast", icon: "☁️" },
  45: { label: "Fog", icon: "🌫️" },
  48: { label: "Rime fog", icon: "🌫️" },
  51: { label: "Light drizzle", icon: "🌦️" },
  53: { label: "Drizzle", icon: "🌦️" },
  55: { label: "Heavy drizzle", icon: "🌧️" },
  56: { label: "Freezing drizzle", icon: "🌧️" },
  57: { label: "Heavy freezing drizzle", icon: "🌧️" },
  61: { label: "Light rain", icon: "🌦️" },
  63: { label: "Rain", icon: "🌧️" },
  65: { label: "Heavy rain", icon: "🌧️" },
  66: { label: "Freezing rain", icon: "🌧️" },
  67: { label: "Heavy freezing rain", icon: "🌧️" },
  71: { label: "Light snow", icon: "🌨️" },
  73: { label: "Snow", icon: "❄️" },
  75: { label: "Heavy snow", icon: "❄️" },
  77: { label: "Snow grains", icon: "🌨️" },
  80: { label: "Rain showers", icon: "🌦️" },
  81: { label: "Showers", icon: "🌧️" },
  82: { label: "Heavy showers", icon: "⛈️" },
  85: { label: "Snow showers", icon: "🌨️" },
  86: { label: "Heavy snow showers", icon: "❄️" },
  95: { label: "Thunderstorm", icon: "⛈️" },
  96: { label: "Thunderstorm with hail", icon: "⛈️" },
  99: { label: "Severe thunderstorm with hail", icon: "⛈️" }
};

function getWeatherType(code) {
  return weatherTypes[code] || { label: "Weather unavailable", icon: "🌡️" };
}

function setStatus(message, type = "") {
  statusMessage.textContent = message;
  statusMessage.className = `status ${type}`.trim();
}

function setLoading(isLoading) {
  loadingOverlay.hidden = !isLoading;
  searchButton.disabled = isLoading;
  searchButton.textContent = isLoading ? "Searching…" : "Search →";
  cityInput.disabled = isLoading;
}

async function findCity(name) {
  const url = `${API.geocoding}?name=${encodeURIComponent(name)}&count=1&language=en&format=json`;
  let response;

  try {
    response = await fetch(url);
  } catch {
    throw new Error("Network problem. Check your internet connection and try again.");
  }

  if (!response.ok) {
    throw new Error("The city search service is unavailable right now. Please try again.");
  }

  const data = await response.json();
  if (!data.results || data.results.length === 0) {
    throw new Error(`We couldn't find “${name}”. Check the spelling or try another city.`);
  }

  const city = data.results[0];
  return {
    name: city.name,
    country: city.country || "",
    admin: city.admin1 || "",
    latitude: city.latitude,
    longitude: city.longitude
  };
}

async function getWeather(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    forecast_days: "5",
    timezone: "auto"
  });

  let response;
  try {
    response = await fetch(`${API.forecast}?${params.toString()}`);
  } catch {
    throw new Error("Network problem while loading weather. Please check your connection.");
  }

  if (!response.ok) {
    throw new Error("We couldn't load the forecast right now. Please try again shortly.");
  }

  return response.json();
}

function formatDate(dateString, options) {
  return new Date(`${dateString}T12:00:00`).toLocaleDateString(undefined, options);
}

function addText(parent, tag, className, value) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  element.textContent = value;
  parent.appendChild(element);
  return element;
}

function renderCurrent(city, weather) {
  const current = weather.current;
  const type = getWeatherType(current.weather_code);
  const locationParts = [city.name, city.admin, city.country].filter(Boolean);

  document.querySelector("#location-name").textContent = [...new Set(locationParts)].join(", ");
  document.querySelector("#current-date").textContent =
    formatDate(current.time.slice(0, 10), { weekday: "long", month: "long", day: "numeric" });
  document.querySelector("#weather-description").textContent = type.label;
  document.querySelector("#current-icon").textContent = type.icon;
  document.querySelector("#current-temperature").textContent = `${Math.round(current.temperature_2m)}°`;
  document.querySelector("#wind-speed").textContent = `${Math.round(current.wind_speed_10m)} km/h`;
  document.querySelector("#humidity").textContent = `${current.relative_humidity_2m}%`;
  document.querySelector("#feels-like").textContent = `${Math.round(current.apparent_temperature)}°`;
}

function renderForecast(weather) {
  forecastGrid.replaceChildren();

  weather.daily.time.forEach((date, index) => {
    const type = getWeatherType(weather.daily.weather_code[index]);
    const card = document.createElement("article");
    card.className = "forecast-card";

    addText(card, "p", "forecast-day",
      index === 0 ? "Today" : formatDate(date, { weekday: "short" }));
    addText(card, "div", "forecast-icon", type.icon).setAttribute("aria-hidden", "true");
    addText(card, "p", "forecast-desc", type.label);

    const temperatures = document.createElement("div");
    temperatures.className = "forecast-temps";
    addText(temperatures, "span", "", `${Math.round(weather.daily.temperature_2m_max[index])}°`);
    addText(temperatures, "span", "forecast-low", `${Math.round(weather.daily.temperature_2m_min[index])}°`);
    card.appendChild(temperatures);
    forecastGrid.appendChild(card);
  });
}

async function searchWeather(cityName) {
  const name = cityName.trim();

  if (!name) {
    setStatus("Please enter a city name before searching.", "error");
    cityInput.focus();
    return;
  }

  if (name.length < 2) {
    setStatus("Enter at least two characters for the city name.", "error");
    cityInput.focus();
    return;
  }

  setLoading(true);
  setStatus("Finding your city and checking the weather…");

  try {
    const city = await findCity(name);
    const weather = await getWeather(city.latitude, city.longitude);

    renderCurrent(city, weather);
    renderForecast(weather);
    weatherContent.hidden = false;
    setStatus(`Weather updated for ${city.name}.`, "success");

    try {
      localStorage.setItem("skycast-last-city", city.name);
    } catch {
      // Storage can be disabled by browser privacy settings; weather still works.
    }
  } catch (error) {
    setStatus(error instanceof Error ? error.message : "Something went wrong. Please try again.", "error");
  } finally {
    setLoading(false);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  searchWeather(cityInput.value);
});

// Quick city buttons do not call the API on each keystroke.
document.querySelectorAll(".city-chip").forEach((button) => {
  button.addEventListener("click", () => {
    cityInput.value = button.dataset.city || "";
    searchWeather(cityInput.value);
  });
});

// Debounced suggestion feedback only; actual API requests happen on submit.
let inputDebounce;
cityInput.addEventListener("input", () => {
  clearTimeout(inputDebounce);
  inputDebounce = setTimeout(() => {
    if (!cityInput.value.trim()) {
      setStatus("Type a city name, then press Search.");
    } else if (cityInput.value.trim().length < 2) {
      setStatus("Enter at least two characters for the city name.");
    } else {
      setStatus("Press Search to fetch the latest weather.");
    }
  }, 250);
});

// Restore the last searched city, but wait for the user to submit or use a quick city.
try {
  const lastCity = localStorage.getItem("skycast-last-city");
  if (lastCity) cityInput.value = lastCity;
} catch {
  // Ignore storage errors.
}
