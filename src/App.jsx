import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "2c2141aef5d84d969c950446261504";

  const getWeather = async () => {
    if (!city) return;
    try {
      const res = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      setWeather(res.data);
    } catch {
      alert("City not found ❌");
    }
  };

  // 🎨 BACKGROUND
  const getBackground = () => {
    if (!weather) {
      return {
        background: "linear-gradient(to right, #6366f1, #9333ea)",
      };
    }

    const c = weather.current.condition.text.toLowerCase();

    // 🌥️ CLOUDY
    if (c.includes("cloud") || c.includes("overcast")) {
      return {
        backgroundImage:
          "url('https://static.vecteezy.com/system/resources/thumbnails/026/421/357/original/cartoon-animated-blue-sky-moving-background-with-clouds-seamless-loop-video.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    }

    // ☀️ SUNNY (YOUR IMAGE ✅)
    if (c.includes("sunny") || c.includes("clear")) {
      return {
        backgroundImage:
          "url('https://wallpaperaccess.com/full/2150511.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    }

    // 🌧️ / ⛈️
    if (c.includes("thunder") || c.includes("rain") || c.includes("drizzle")) {
      return {
        background: "linear-gradient(to right, #1e3a8a, #111827)",
      };
    }

    // ❄️
    if (c.includes("snow")) {
      return {
        background: "linear-gradient(to right, #bfdbfe, #ffffff)",
      };
    }

    return {
      background: "linear-gradient(to right, #6366f1, #9333ea)",
    };
  };

  // 🌤️ ANIMATIONS
  const getWeatherAnimation = () => {
    if (!weather) return null;

    const c = weather.current.condition.text.toLowerCase();

    if (c.includes("sunny") || c.includes("clear")) {
      return <div className="sun"></div>;
    }

    else if (c.includes("cloud") || c.includes("overcast")) {
      return (
        <img
          src="https://www.icegif.com/wp-content/uploads/2023/08/icegif-886.gif"
          alt="cloudy"
          className="w-28 h-28 object-contain"
        />
      );
    }

    else if (c.includes("thunder")) {
      return <div className="thunder"></div>;
    }

    else if (c.includes("rain") || c.includes("drizzle")) {
      return <div className="rain"></div>;
    }

    else if (c.includes("snow")) {
      return <div className="snow"></div>;
    }

    else if (c.includes("mist") || c.includes("fog") || c.includes("haze")) {
      return <div className="mist"></div>;
    }

    return null;
  };

  return (
    <div
      style={getBackground()}
      className="min-h-screen flex items-center justify-center transition-all duration-700"
    >
      <div className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-3xl p-8 w-[370px] text-center text-white">

        <h1 className="text-3xl font-bold mb-6">
          🌦 Weather App
        </h1>

        <input
          type="text"
          placeholder="Search city..."
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && getWeather()}
          className="w-full p-3 rounded-xl bg-white/30 placeholder-white text-white mb-4 focus:outline-none focus:ring-2 focus:ring-white"
        />

        <button
          onClick={getWeather}
          className="w-full py-2 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition"
        >
          Search
        </button>

        {weather && (
          <div className="mt-6 space-y-2">

            <div className="flex justify-center">
              {getWeatherAnimation()}
            </div>

            <h2 className="text-2xl font-semibold">
              {weather.location.name}
            </h2>

            <p className="text-sm opacity-80">
              {weather.location.country}
            </p>

            <p className="text-5xl font-bold">
              {weather.current.temp_c}°
            </p>

            <p className="text-lg capitalize">
              {weather.current.condition.text}
            </p>

            <img
              src={weather.current.condition.icon}
              alt="icon"
              className="mx-auto w-14"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;