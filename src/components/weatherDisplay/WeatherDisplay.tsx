import React from "react";
import { WeatherDisplayProps } from "./WeatherDisplayProps.types";
import styles from './WeatherDisplay.module.scss';

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
  if (!weather) return <p>No weather data available.</p>;

  return (
    <div className={styles.weatherInfo}>
      <p>{weather.city}, {weather.country}</p>
      <p>{weather.temperature.value}°C</p>
      <p>{weather.description}</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.iconId}@2x.png`}
        alt="Weather icon"
      />
    </div>
  );
};

export default WeatherDisplay;
