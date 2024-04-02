"use client";

import { useQuery } from "react-query";
import DateInfo from "./components/DateInfo";
import WeatherIcon from "./components/WeatherIcon";
import WeatherNavbar from "./components/WeatherNavbar";
import { WeatherAPI_Res_Type } from "./components/types";
import { getDayOrNightIcon, getLocalHour } from "./helper";
import WeatherDetails from "./components/WeatherDetails";

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

  console.log(data);

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
            <DateInfo dateObj={dateObj} />
            <div className="w-full bg-white border rounded-xl flex py-4 shadow-sm gap-10 px-6 items-center">
              {/* temprature */}
              <div className="flex flex-col px-4 items-center gap-1">
                <span className="text-5xl">
                  {Math.round(firstData?.main.temp ?? 0)}°
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span>Feels like</span>
                  <span>
                    {Math.round(
                      firstData?.main.feels_like ?? 0
                    )}
                    °
                  </span>
                </p>
                <p className="text-xs space-x-2">
                  <span>
                    {Math.round(
                      firstData?.main.temp_min ?? 0
                    )}
                    °↓{" "}
                  </span>
                  <span>
                    {" "}
                    {Math.round(
                      firstData?.main.temp_max ?? 0
                    )}
                    °↑
                  </span>
                </p>
              </div>
              {/* time and weather icon and info */}
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
            </div>
          </div>
          <div className="flex gap-4">
            {/* left container */}
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
                  data? data.city.timezone : 0
                )}
              />
            </div>
            {/* right container */}
            <div className="w-full bg-yellow-300/80 border rounded-xl flex py-4 shadow-sm px-6 gap-4 justify-between overflow-x-auto">
              <WeatherDetails
                visibility={firstData?.visibility ?? 1000}
                humidity={firstData?.main.humidity ?? 0}
                windSpeed={firstData?.wind.speed ?? 0}
                airPressure={
                  firstData?.main.pressure ?? 1000
                }
                sunrise={data?.city.sunrise ?? 0}
                sunset={data?.city.sunset ?? 0}
              />
            </div>
          </div>
        </section>

        {/* 7days weather forecast */}
        <section className="flex flex-col w-full gap-4">
          <p className="text-2xl">Forecast (7 days)</p>
        </section>
      </main>
    </div>
  );
}
