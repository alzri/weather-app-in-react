import { useEffect } from "react";
import { useWeather } from "./hook";
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";
import SearchBar from "./components/SearchBar/SearchBar";
import styles from './assets/styles.module.scss';

const App: React.FC = () => {
  const { weather, getWeatherByCoords, getWeatherByCity } = useWeather();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getWeatherByCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          console.error(err.message);
        }
      );
    }
  }, [getWeatherByCoords]);

  return (
    <div className={styles.weatherApp}>
      <SearchBar onSearch={getWeatherByCity} />
      <WeatherDisplay weather={weather} />
    </div>
  );
};

export default App;
