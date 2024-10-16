import React from "react";
import { useState, useEffect } from "react";
import { WeatherDataProps } from "./WeatherDataProps.types";

const KELVIN = 273;
const API_KEY = '8cefda58c9469aa86555ae59e49b59a1';

export const useWeather = () => {
  const [city, setCity] = useState<string>('');
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [weather, setWeather] = useState<WeatherDataProps | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          getWeather(position.coords.latitude, position.coords.longitude);
        },
        (err) => setError(err.message)
      );
    } else {
      setError("Browser doesn't support geolocation");
    }
  }, []);

  const getSearchWeather = (city: string) => {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        setWeather({
          temperature: Math.floor(data.main.temp - KELVIN),
          description: data.weather[0].description,
          iconId: data.weather[0].icon,
          city: data.name,
          country: data.sys.country,
        });
      })
      .catch((err) => setError(err.message));
  };

  const getWeather = (latitude: number, longitude: number) => {
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        setWeather({
          temperature: Math.floor(data.main.temp - KELVIN),
          description: data.weather[0].description,
          iconId: data.weather[0].icon,
          city: data.name,
          country: data.sys.country,
        });
      })
      .catch((err) => setError(err.message));
  };

  return { weather, error, getSearchWeather };
};