import { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);



  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeather = async () => {
    if (!city) return;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error('City not found');
      const data = await res.json();
      setWeather(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };
  let bgClass = '';

if (weather) {
  const condition = weather.weather[0].main.toLowerCase();
  if (condition.includes('cloud')) bgClass = 'cloudy';
  else if (condition.includes('rain')) bgClass = 'rainy';
  else if (condition.includes('clear')) bgClass = 'sunny';
  else if (condition.includes('snow')) bgClass = 'snowy';
  else bgClass = 'default';
}


  return (
    <div className={`app ${bgClass} ${darkMode ? 'dark' : ''}`}>

    {/* ✅ Dark Mode Toggle Button */}
    <button onClick={() => setDarkMode(!darkMode)} className="dark-toggle">
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>

      <h1>🌤️ Weather App</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Search</button>
      </div>
      <button onClick={() => setIsCelsius(!isCelsius)} className="unit-toggle">
  Switch to {isCelsius ? 'Fahrenheit (°F)' : 'Celsius (°C)'}
</button>


      {error && <p className="error">{error}</p>}

      {weather && (
  <div className="weather-card">
    <h2>{weather.name}, {weather.sys.country}</h2>

    
    <img
      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      alt={weather.weather[0].description}
    />

<p>
  🌡️ Temp: {isCelsius
    ? weather.main.temp.toFixed(1) + " °C"
    : ((weather.main.temp * 9) / 5 + 32).toFixed(1) + " °F"}
</p>

    <p>🌥️ Condition: {weather.weather[0].description}</p>
    <p>💨 Wind: {weather.wind.speed} m/s</p>
    <p>💧 Humidity: {weather.main.humidity}%</p>
  </div>
)}

    </div>
  );
}

export default App;
