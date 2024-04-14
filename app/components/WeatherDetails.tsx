// creating a container for each weather detail, e.g. Wind Speed, to hold the detail name, icon and value

import { FiDroplet } from "react-icons/fi";
import { ImMeter } from "react-icons/im";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { MdAir } from "react-icons/md";
import {
  SingleWeatherDetailProps,
  WeatherDetailsProps,
} from "./types";

function SingleWeatherDetail({
  icon,
  info,
  value,
}: SingleWeatherDetailProps) {
  return (
    <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80">
      <p className="whitespace-nowrap">{info}</p>
      <div className="text-3xl">{icon}</div>
      <p>{value}</p>
    </div>
  );
}

// creating a row of weather information using 6 SingleWeatherDetail,
// including Visibility, Humidity, Wind Speed, Air Pressure, Sunrise, Sunset

export default function WeatherDetails({
  visibility,
  humidity,
  windSpeed,
  airPressure,
  sunrise,
  sunset,
}: WeatherDetailsProps) {
  const sunriseObj = new Date(sunrise * 1000);
  const sunsetObj = new Date(sunset * 1000);
  return (
    <>
      <SingleWeatherDetail
        icon={<LuEye />}
        info="Visibility"
        value={Math.round(visibility / 1000) + "km"}
      />
      <SingleWeatherDetail
        icon={<FiDroplet />}
        info="Humidity"
        value={humidity + "%"}
      />
      <SingleWeatherDetail
        icon={<MdAir />}
        info="Wind Speed"
        value={Math.floor(windSpeed * 3.6) + " km/h"} //converting m/s to km/h
      />
      <SingleWeatherDetail
        icon={<ImMeter />}
        info="Air Pressure"
        value={airPressure + " mmHg"}
      />
      <SingleWeatherDetail
        icon={<LuSunrise />}
        info="Sunrise"
        value={
          sunriseObj.getHours() +
          ":" +
          sunriseObj.getMinutes()
        }
      />
      <SingleWeatherDetail
        icon={<LuSunset />}
        info="Sunset"
        value={
          sunsetObj.getHours() +
          ":" +
          sunsetObj.getMinutes()
        }
      />
    </>
  );
}
