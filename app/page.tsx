"use client";

import { useQuery } from "react-query";
import WeatherNavbar from "./components/WeatherNavbar";
import { WeatherAPI_Res_Type } from "./components/types";

export default function WeatherApp() {
  const { isLoading, error, data } = useQuery(
    "repoData",
    async () => {
      const raw = await fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=tehran&appid=e8088829b0d4947e09ae641493599950&cnt=40"
      );
      const data: WeatherAPI_Res_Type = await raw.json();
      return data;
    }
  );
  console.log("data", data?.city.name);
  if (isLoading) {
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );

  }
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <WeatherNavbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* today's weather info */}
        <section>
          <div>
            <h2 className="flex gap-1 text-2xl items-end">
              <p></p>
            </h2>
            <div></div>
          </div>
        </section>

        {/* 7days weather forecast */}
        <section></section>
      </main>
    </div>
  );
}
