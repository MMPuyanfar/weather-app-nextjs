import { getDayOrNightIcon } from "../helper";
import WeatherIcon from "./WeatherIcon";
import { WeatherAPI_Res_Type } from "./types";

//This component renders the little box in today weather section (first section of the app) that shows the weather icon and a short description related to that.
interface TodayIconAndDescProps {
  data: WeatherAPI_Res_Type | undefined;
}
export default function TodayIconAndDesc({
  data,
}: TodayIconAndDescProps) {
  const firstData = data?.list[0];
  return (
    <div className="w-fit bg-white border rounded-xl flex py-4 shadow-sm justify-center flex-col px-4 items-center">
      <p className="capitalize text-center"> 
        {/* extracting needed data from API response  */}
        {firstData?.weather[0].description}
      </p>
      <WeatherIcon
        iconName={getDayOrNightIcon(
          firstData ? firstData.weather[0].icon : "",
          firstData ? firstData.dt_txt : "",
          data ? data.city.timezone : 0
        )} // using a helper function to find out whether it is day or night now in that city to show the day icon or night icon
      />
    </div>
  );
}
