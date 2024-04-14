"use client";

import { useAtom } from "jotai";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { loadingCityAtom, placeAtom } from "./atom";
import DateInfo from "./components/DateInfo";
import ForecastWeatherDetails from "./components/ForecastWeatherDetails";
import Loading from "./components/Loading";
import TodayIconAndDesc from "./components/TodayIconAndDesc";
import TodayTemps from "./components/TodayTemps";
import WeatherDetails from "./components/WeatherDetails";
import WeatherIconAndInfoThreeHours from "./components/WeatherIconAndInfoThreeHours";
import WeatherNavbar from "./components/WeatherNavbar";
import { WeatherAPI_Res_Type } from "./components/types";
import {
  getDayOfMonth,
  getMonthNumber,
  getSunrise,
  getSunset,
  getWeekDay,
} from "./helper";

export default function WeatherApp() {
  const [place, setPlace] = useAtom(placeAtom); //global state management using jotai lib
  const [loadingCity, setLoadingCity] =
    useAtom(loadingCityAtom); //global state management using jotai lib
  const { isLoading, error, data, refetch } = useQuery(
    "repoData",
    async () => {
      const raw = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=e8088829b0d4947e09ae641493599950&units=metric&cnt=40`
      );
      const data: WeatherAPI_Res_Type = await raw.json();
      return data;
    }
  ); // fetching weather data from openweathermap API

  useEffect(() => {
    refetch();
  }, [place, refetch]); // refetch on city change

  if (isLoading) {
    return <Loading />; //Loading Component for covering the fetch delay
  }

  const firstData = data?.list[0]; // extracting the weather info for Now

  const dateObj = firstData
    ? new Date(firstData.dt_txt)
    : new Date(); // extracting date object for now

  const fiveDaysDataList = data?.list.filter(
    (d, i) => i % 8 === 7
  ); // extracting the data for 5 days weather forecast
  // (data available for every 3 hours, every 8 data is for one day, a list of 40 is fetch equivalent to 5 days)

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <WeatherNavbar />

      {loadingCity ? (
        <Loading />
      ) : (
        <main className="px-3 max-w-[1280px] mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
          {/* today's weather info */}
          <section className="space-y-4">
            {/* first row: temps and weather icons */}
            <div className="space-y-2">
              <DateInfo dateObj={dateObj} />

              <div className="w-full bg-white border rounded-xl flex py-4 shadow-sm gap-10 px-6 items-center">
                {/* Today tempratures */}
                <TodayTemps firstData={firstData} />
                {/* time and weather icon and info for every 3 hours */}
                <WeatherIconAndInfoThreeHours data={data} />
              </div>
            </div>

            {/* second row: Today's weather attributes, e.g. visibility, humidity, etc */}
            <div className="flex gap-4">
              {/* left container */}
              <TodayIconAndDesc data={data} />
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

          {/* today's weather info finished */}

          {/* 5days weather forecast */}
          <section className="flex flex-col w-full gap-4">
            <p className="text-2xl">Forecast (5 days)</p>
            {fiveDaysDataList?.map((d, i) => (
              <ForecastWeatherDetails
                key={d.dt}
                weatherIcon={d.weather[0].icon}
                date={`${getMonthNumber(
                  new Date(d.dt_txt)
                )}.${getDayOfMonth(new Date(d.dt_txt))}`}
                day={getWeekDay(new Date(d.dt_txt))}
                temp={d.main.temp}
                tempMin={d.main.temp_min}
                tempMax={d.main.temp_max}
                feelsLike={d.main.feels_like}
                description={d.weather[0].description}
                visibility={d.visibility}
                humidity={d.main.humidity}
                airPressure={d.main.pressure}
                windSpeed={d.wind.speed}
                sunrise={getSunrise(
                  d.dt_txt,
                  i,
                  data?.city.sunrise ?? 0
                )}
                sunset={getSunset(
                  d.dt_txt,
                  i,
                  data?.city.sunset ?? 0
                )}
              />
            ))}
          </section>
          {/* 5 days forecast section finished */}
        </main>
      )}
    </div>
  );
}
