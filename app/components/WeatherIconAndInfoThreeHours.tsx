import { getDayOrNightIcon, getLocalHour } from "../helper";
import WeatherIcon from "./WeatherIcon";
import { WeatherAPI_Res_Type } from "./types";

//This component renders the 3-hourly weather forecast from now till next 5 days, containing the tempreture and weather icon alongside the local time
interface WeatherIconAndInfoThreeHoursType {
  data: WeatherAPI_Res_Type | undefined;
}
export default function WeatherIconAndInfoThreeHours({
  data,
}: WeatherIconAndInfoThreeHoursType) {
  return (
    <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
      {data?.list.map((d) => (
        <div
          key={d.dt}
          className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
        >
          <p className="whitespace-nowrap">
            {getLocalHour(d.dt_txt, data.city.timezone)}
          </p>
          <WeatherIcon
            iconName={getDayOrNightIcon(
              d.weather[0].icon,
              d.dt_txt,
              data.city.timezone
            )}
          />
          <p>{Math.round(d.main.temp ?? 0)}°</p>
        </div>
      ))}
    </div>
  );
}
