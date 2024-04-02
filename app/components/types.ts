// SearchBarProps type declaration

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


// Weather API response type declaration

export interface WeatherAPI_Res_Type {
  cod: string;
  message: number;
  cnt: number;
  list: List[];
  city: City;
}

interface List {
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


// children prop
export type InfoBoxProps = {
  children: React.ReactNode;
}

// Date Info Component Prop Type
export type DateInfoProp = {
  dateObj:Date;
}

export type WeatherIconProp = {
  iconName: string;
}