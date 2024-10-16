import React, { useState } from "react";
import { SearchBarProps } from "./SearchBarProps.tyles";

const SearchBar: React.FC<SearchBarProps> = ({setCity}) => {
    const [cityInput, setCityInput] = useState<string>('');

    const handleSeacrh = () => {
        if (cityInput) {
            setCity(cityInput)
        }
    };

    return (
        <div>
            <input 
                type="text" 
                value={cityInput} 
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="Enter city name"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSeacrh();
                }}
             />

             <button onClick={handleSeacrh}>Seach</button>
        </div>
    )
};

export default SearchBar;