# SkyCast — Live Weather Dashboard

A responsive weather dashboard built with HTML, CSS, and vanilla JavaScript. It uses the free Open-Meteo Geocoding and Forecast APIs, so no API key is required.

## Features
- Search a city and fetch current weather conditions
- Current temperature, weather icon, humidity, wind speed, and feels-like temperature
- Five-day forecast with daily highs and lows
- Loading indicator, empty-input validation, city-not-found and network/API error messages
- Uses `fetch`, `async/await`, `response.ok`, and `encodeURIComponent` / `URLSearchParams`
- Safe DOM updates with `textContent`
- Remembers the last searched city in `localStorage`
- Responsive layout for mobile and desktop
- Debounced input feedback; API calls only happen after submit or a quick-city button click

## Run locally
1. Extract the ZIP file.
2. Open the folder in VS Code.
3. Run `index.html` using the Live Server extension, or serve the folder with any local static web server.
4. Search for a city (e.g. New Delhi).

Internet access is required for live weather data.

## Deploy free with GitHub Pages
1. Create a GitHub repository and upload `index.html`, `style.css`, `script.js`, and `README.md`.
2. Open repository **Settings → Pages**.
3. Under Build and deployment, choose **Deploy from a branch**.
4. Select branch `main` and folder `/ (root)`, then save.
5. After deployment, GitHub will show your live website URL in the Pages section.

## Error handling note for submission
The app validates empty and too-short input before making requests. It checks `response.ok` before parsing API responses, handles network failures separately, shows a friendly message when a city cannot be found, disables the search button while loading, and restores the button after success or failure. API calls are not made on every keystroke.

## API references
- https://open-meteo.com/en/docs
- https://open-meteo.com/en/docs/geocoding-api
