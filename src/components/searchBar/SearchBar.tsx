import React, {useState} from "react";
import { SearchBarProps } from "./SearchBarProps.types";
import styles from './SearchBar.module.scss';

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(city);
    }
  };

  return (
    <input
      className={styles.search}
      type="text"
      placeholder="Enter city"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      onKeyPress={handleSearch}
    />
  );
};

export default SearchBar;
