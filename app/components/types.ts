// Weather API response type declaration
export interface WeatherAPI_Res_Type {
  cod: string;
  message: number;
  cnt: number;
  list: List[];
  city: City;
}

export interface List {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Sys {
  pod: string;
}

interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface Coord {
  lat: number;
  lon: number;
}
// end of Weather API response type

//Geo API response type declaration for suggesting cities in WeatherNavbar component
export interface CityResponse {
  data: CitySuggest;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request: any;
}
export interface CitySuggest {
  message: string;
  cod: string;
  count: number;
  list: CityDetailsList[];
}

export interface CityDetailsList {
  id: number;
  name: string;
  coord: any;
  main: any;
  dt: number;
  wind: any;
  sys: any;
  rain: any;
  snow: any;
  clouds: any;
  weather: any;
}
//end of Geo API response type

// The rest of types are clear based on their names
import {
  ChangeEventHandler,
  FormEventHandler,
} from "react";

export type SearchBarProps = {
  value: string;
  onChange:
    | ChangeEventHandler<HTMLInputElement>
    | undefined;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
};

export type DateInfoProp = {
  dateObj: Date;
};

export type WeatherIconProp = {
  iconName: string;
};

export type SingleWeatherDetailProps = {
  info: string;
  icon: React.ReactNode;
  value: string;
};

export interface WeatherDetailsProps {
  visibility: number;
  humidity: number;
  windSpeed: number;
  airPressure: number;
  sunrise: number;
  sunset: number;
}

export interface ForecastWeatherDetailsProps
  extends WeatherDetailsProps {
  weatherIcon: string;
  date: string;
  day: string;
  temp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  description: string;
}
export interface SuggestionBoxProps {
  suggestion: string[];
  handleSuggestClick: (item: string) => void;
  error: string;
}
