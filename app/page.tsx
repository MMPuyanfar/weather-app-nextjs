"use client";

import { useQuery } from "react-query";
import DateInfo from "./components/DateInfo";
import InfoBox from "./components/InfoBox";
import WeatherNavbar from "./components/WeatherNavbar";
import { WeatherAPI_Res_Type } from "./components/types";

export default function WeatherApp() {
  const { isLoading, error, data } = useQuery(
    "repoData",
    async () => {
      const raw = await fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=tehran&appid=e8088829b0d4947e09ae641493599950&cnt=40&units=metric"
      );
      const data: WeatherAPI_Res_Type = await raw.json();
      return data;
    }
  );
  if (isLoading) {
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );
  }

  console.log(data?.list[0].main.temp_min);

  const firstData = data?.list[0];
  const dateObj = firstData
    ? new Date(firstData.dt_txt)
    : new Date();

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <WeatherNavbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* today's weather info */}
        <section className="space-y-4">
          <div className="space-y-2">
            <DateInfo dateObj={dateObj}/>
            <InfoBox>
              {/* temprature */}
              <div className="flex flex-col px-4 items-center gap-1">
                <span className="text-5xl">{Math.round(firstData?.main.temp ?? 0)}°</span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span>Feels like</span>
                  <span>{Math.round(firstData?.main.feels_like ?? 0)}°</span>
                </p>
                <p className="text-xs space-x-2">
                  <span>{Math.round(firstData?.main.temp_min ?? 0)}°↓{" "}</span>
                  <span>{" "}{Math.round(firstData?.main.temp_max ?? 0)}°↑</span>
                </p>
              </div>
              {/* time and weather icon and info */}
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">

              </div>
            </InfoBox>
          </div>
        </section>

        {/* 7days weather forecast */}
        <section></section>
      </main>
    </div>
  );
}
