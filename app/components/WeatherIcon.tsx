import Image from "next/image";
import { WeatherIconProp } from "./types";

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
