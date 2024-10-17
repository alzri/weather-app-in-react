import { useState, useEffect } from "react";
import { WeatherData, GeolocationCoords, WeatherApiResponse, ErrorData } from "./types/weather.types";

const KELVIN = 273;
const API_KEY = "3ed690c32ce93d0153af6462507f005d";

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const lastWeather = localStorage.getItem("lastWeather");
    if (lastWeather) {
      setWeather(JSON.parse(lastWeather));
    }
  }, []);

  const getWeatherByCoords = async (coords: GeolocationCoords) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data: WeatherApiResponse = await response.json();
      const fetchedWeather: WeatherData = {
        temperature: { value: Math.floor(data.main.temp - KELVIN), unit: "celsius" },
        description: data.weather[0].description,
        iconId: data.weather[0].icon,
        city: data.name,
        country: data.sys.country,
      };

      setWeather(fetchedWeather);
      localStorage.setItem("lastWeather", JSON.stringify(fetchedWeather));
      setError(null);
    } catch (err) {
      setError((err as ErrorData).message);
    }
  };

  const getWeatherByCity = async (city: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data: WeatherApiResponse = await response.json();
      const fetchedWeather: WeatherData = {
        temperature: { value: Math.floor(data.main.temp - KELVIN), unit: "celsius" },
        description: data.weather[0].description,
        iconId: data.weather[0].icon,
        city: data.name,
        country: data.sys.country,
      };

      setWeather(fetchedWeather);
      localStorage.setItem("lastWeather", JSON.stringify(fetchedWeather));
      setError(null); 
    } catch (err) {
      setError((err as ErrorData).message);
    }
  };

  return { weather, error, getWeatherByCoords, getWeatherByCity };
};
