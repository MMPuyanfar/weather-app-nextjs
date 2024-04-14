import Image from "next/image";
import {type WeatherIconProp } from "./types";

//This component recieve an icon name string and uses it to fetch a weather icon
export default function WeatherIcon({iconName}: WeatherIconProp) {
  return (
    <div className="relative h-20 w-20">
      <Image
        src={`https://openweathermap.org/img/wn/${iconName}@4x.png`}
        width={100}
        height={100}
        alt="weather-icon"
        className="absolute h-full w-full"
      />
    </div>
  );
}
