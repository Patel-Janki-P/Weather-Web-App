# 🌤️ Weather App

A modern weather forecast web application built using **Vite**, **React.js**, and **Tailwind CSS**. This app provides current weather conditions, a 5-day forecast, and an hourly forecast with real-time updates and responsive UI.

## 🚀 Features

- 🔍 Search weather by city name
- 📍 Get weather by current location
- 🕒 Live clock display
- 🌡️ Shows temperature, humidity, wind speed, pressure, and UV index
- ☁️ Current weather description with icon
- 📅 5-day forecast
- ⏰ Hourly forecast (next 5 intervals)
- 🌅 Sunrise and sunset timings
- 📱 Responsive and user-friendly interface

---

## 🛠️ Tech Stack

- [React.js](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenWeatherMap API](https://openweathermap.org/api) (for weather data)
- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)

---

## 📁 Project Structure

- weather/
  - ├── public/
  - ├── src/
  - │ ├──── assets/ # Static assets (icons, images, etc.)
  - │ ├──── components/ # React components
  - │ │  ├─── CityAndTime.jsx # Displays city name and current time
  - │ │  ├─── clock.jsx # Digital clock component
  - │ │  ├─── ForeCast.jsx # 5-day and hourly forecast components
  - │ │  └─── navBar.jsx # Search and location bar
  - │ ├──── App.jsx # Main app layout
  - │ ├──── main.jsx # React DOM entry point
  - │ └──── index.css 
  - ├── index.html
  - ├── package.json
  - ├── tailwind.config.js
  - ├── vite.config.js

---


## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
   
2. **Install dependencies**
   ```bash
   npm install

3. **Run the development server**
   ```bash
   npm run dev

4. **Build for production**
   ```bash
   npm run build

---

## 🌐 API Setup

1. Create a free account at OpenWeatherMap.
2. Get your API key.
3. Create a .env file in the root directory and add:
   ```env
   VITE_WEATHER_API_KEY=your_api_key_here
4. Use the key in your fetch calls like:
   ```js
   const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

---
## 🧑‍🎨 UI Preview
![Screenshot 2025-05-29 133614](https://github.com/user-attachments/assets/9a2c41f2-4b8e-4462-994a-652686d07e47)

---
## ✨ Future Improvements

- Add support for dark mode.
- Display weather alerts (if available).
- Add loading state and error handling animations.

---
## Author

Developed By JANKI PATEL.

