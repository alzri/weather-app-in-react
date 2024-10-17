import React, { useState } from "react";
import { WeatherDisplayProps } from "./WeatherDisplayProps.types";
import styles from './WeatherDisplay.module.scss';

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  if (!weather) return <p>No weather data available.</p>;

  const convertToFahrenheit = (celsius: number) => (celsius * 9/5) + 32;

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const temperatureValue = isCelsius 
    ? weather.temperature.value 
    : convertToFahrenheit(weather.temperature.value);
    
  const temperatureUnit = isCelsius ? "°C" : "°F";

  return (
    <div className={styles.weatherInfo}>
      <p className={styles.cityName}>{weather.city}, {weather.country}</p>
      <div className={styles.weatherDetails}>
        <p>{temperatureValue.toFixed(1)}{temperatureUnit}</p>
        <p>{weather.description}</p>
      </div>
      <img
        className={styles.weatherIcon}
        src={`http://openweathermap.org/img/wn/${weather.iconId}@2x.png`}
        alt="Weather icon"
      />
      <button onClick={toggleTemperatureUnit} className={styles.toggleButton}>
        Switch to {isCelsius ? "Fahrenheit" : "Celsius"}
      </button>
    </div>
  );
};

export default WeatherDisplay;
