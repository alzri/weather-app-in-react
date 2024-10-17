import { useState } from "react";
import { WeatherData, GeolocationCoords, WeatherApiResponse, ErrorData } from "./types/weather.types";

const KELVIN = 273;
const API_KEY = "8cefda58c9469aa86555ae59e49b59a1";

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getWeatherByCoords = async (coords: GeolocationCoords) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}`
      );
      const data: WeatherApiResponse = await response.json();
      setWeather({
        temperature: { value: Math.floor(data.main.temp - KELVIN), unit: "celsius" },
        description: data.weather[0].description,
        iconId: data.weather[0].icon,
        city: data.name,
        country: data.sys.country,
      });
    } catch (err) {
      setError((err as ErrorData).message);
    }
  };

  const getWeatherByCity = async (city: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      const data: WeatherApiResponse = await response.json();
      setWeather({
        temperature: { value: Math.floor(data.main.temp - KELVIN), unit: "celsius" },
        description: data.weather[0].description,
        iconId: data.weather[0].icon,
        city: data.name,
        country: data.sys.country,
      });
    } catch (err) {
      setError((err as ErrorData).message);
    }
  };

  return { weather, error, getWeatherByCoords, getWeatherByCity };
};
