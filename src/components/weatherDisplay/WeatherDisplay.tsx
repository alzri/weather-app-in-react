import React from "react";
import { WeatherDisplayProps } from "./WeatherDisplayProps.types";
import styles from '../../assets/styles.scss';

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({weather})=> {
    return ( 
        <div className={styles['weather-info']}>
            <h2>{weather.city}, {weather.country}</h2>
            <p>{weather.temperature}°C</p>
            <p>{weather.description}</p>
            <img src={`http://openweathermap.org/img/wn/${weather.iconId}@2x.png`} alt="Weather Icon"
        />
        </div>
    )
};

export default WeatherDisplay;