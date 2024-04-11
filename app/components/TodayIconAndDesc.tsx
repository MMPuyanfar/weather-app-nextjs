import { getDayOrNightIcon } from "../helper";
import WeatherIcon from "./WeatherIcon";
import { WeatherAPI_Res_Type } from "./types"

interface TodayIconAndDescProps {
  data: WeatherAPI_Res_Type | undefined;
}
export default function TodayIconAndDesc({data}: TodayIconAndDescProps) {
  const firstData = data?.list[0];
  return (
    <div className="w-fit bg-white border rounded-xl flex py-4 shadow-sm justify-center flex-col px-4 items-center">
                <p className="capitalize text-center">
                  {firstData?.weather[0].description}
                </p>
                <WeatherIcon
                  iconName={getDayOrNightIcon(
                    firstData
                      ? firstData.weather[0].icon
                      : "",
                    firstData ? firstData.dt_txt : "",
                    data ? data.city.timezone : 0
                  )}
                />
              </div>
  )
}
