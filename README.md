# 🌦️ Live Weather Dashboard

A responsive weather website built using **HTML, CSS, and JavaScript** that fetches real-time weather data and displays current conditions along with a 5-day forecast.

## 🚀 Live Demo

🔗 **[View Live Weather Dashboard](https://aman-tech-collab.github.io/WEATHER/)**

## ✨ Features

- 🌍 Search weather by city name
- 🌡️ Display current temperature and weather conditions
- 🌤️ Dynamic weather icons
- 💧 Show humidity and wind speed
- 📅 Five-day weather forecast with daily high and low temperatures
- 📱 Responsive design for desktop, tablet, and mobile
- ⏳ Loading indicator while fetching weather data
- ⚠️ Friendly error messages for invalid cities and network issues
- 🔍 Input validation and debounced input feedback
- 💾 Remember the last searched city using Local Storage

## 🛠️ Technologies Used

- **HTML5** — Website structure
- **CSS3** — Styling and responsive layout
- **JavaScript (ES6+)** — API integration and dynamic DOM updates
- **Fetch API** — Fetching real-time weather data
- **Async/Await** — Handling asynchronous operations
- **Open-Meteo API** — Weather forecasts and city geocoding
- **GitHub Pages** — Free website hosting

## 🌐 API Used

This project uses the free Open-Meteo API. No API key is required.

- [Open-Meteo Forecast API](https://open-meteo.com/en/docs)
- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)

## 📂 Project Structure

```text
WEATHER/
├── index.html
├── style.css
├── script.js
└── README.md
```

## 💻 Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/aman-tech-collab/WEATHER.git
   ```

2. Open the project folder in VS Code.

3. Run `index.html` using the Live Server extension.

4. Search for a city and explore its current weather and five-day forecast.

**Note:** An internet connection is required to fetch live weather data.

## 🛡️ Error Handling

- Validates empty and too-short city names before making API requests.
- Checks `response.ok` before processing API responses.
- Uses `encodeURIComponent()` for city names in API URLs.
- Handles network failures and cities that cannot be found.
- Displays loading feedback and disables the search button while fetching data.
- Uses `textContent` to safely display user-facing text.
- Avoids unnecessary API calls while typing.

## 📌 Learning Outcomes

This project demonstrates practical knowledge of:

- JavaScript Fetch API and `async/await`
- REST API integration and JSON parsing
- Dynamic DOM manipulation
- Input validation and debouncing
- Loading, success, and error states
- Responsive web design
- GitHub Pages deployment

## 👨‍💻 Author

**Aman Kumar**

GitHub: [@AMAN-tech-collab](https://github.com/AMAN-tech-collab)

---

⭐ If you find this project useful, consider giving the repository a star!
