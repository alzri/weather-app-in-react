export interface WeatherData {
    temperature: {
      value: number;
      unit: "celsius";
    };
    description: string;
    iconId: string;
    city: string;
    country: string;
  }
  
  export interface GeolocationCoords {
    latitude: number;
    longitude: number;
  }
  
  export interface WeatherApiResponse {
    main: {
      temp: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
    name: string;
    sys: {
      country: string;
    };
  }
  
  export interface ErrorData {
    message: string;
  }
  