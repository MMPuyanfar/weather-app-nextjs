import WeatherDetails from "./WeatherDetails";
import WeatherIcon from "./WeatherIcon";
import { ForecastWeatherDetailsProps } from "./types";

export default function ForecastWeatherDetails({
  visibility,
  humidity,
  windSpeed,
  airPressure,
  sunrise,
  sunset,
  weatherIcon,
  date,
  day,
  temp,
  feelsLike,
  tempMin,
  tempMax,
  description,
}: ForecastWeatherDetailsProps) {
  return (
    <div className="w-full bg-white border rounded-xl flex py-4 shadow-sm gap-4 overflow-x-hidden">
      {/* left section, weather icon and temps */}
      <div className="flex gap-4 items-center px-4">
        {/* ForecastIconAndDate Component */}
        <div className="items-center flex flex-col">
          <WeatherIcon iconName={weatherIcon} />
          <p>{date}</p>
          <p className="text-sm">{day}</p>
        </div>

        {/* ForecastTempsAndDescription Component */}
        <div className="flex flex-col px-4">
          <span className="text-5xl">
            {Math.round(temp ?? 0)}°
          </span>
          <p className="text-xs space-x-1 whitespace-nowrap">
            <span>Fells like</span>
            <span>{Math.round(feelsLike ?? 0)}°</span>
          </p>
          <p className="text-xs flex justify-between">
            <span>{Math.round(tempMin ?? 0)}°↓</span>
            <span>{Math.round(tempMax ?? 0)}°↑</span>
          </p>
          <p className="capitalize">{description}</p>
        </div>
      </div>

      {/* right section, visibility, humidity, etc */}

      <div className="overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10">
        <WeatherDetails
          visibility={visibility}
          humidity={humidity}
          windSpeed={windSpeed}
          airPressure={airPressure}
          sunrise={sunrise}
          sunset={sunset}
        />
      </div>
    </div>
  );
}
