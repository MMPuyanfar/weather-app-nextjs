"use client";

import axios from "axios";
import { useState } from "react";
import {
  MdOutlineLocationOn,
  MdWbSunny,
} from "react-icons/md";
import SearchBox from "./SearchBox";
import SuggestionBox from "./SuggestionBox";
import { CityResponse } from "./types";
import { useAtom } from "jotai";
import { loadingCityAtom, placeAtom } from "../atom";

export default function WeatherNavbar() {
  const [city, setCity] = useState("Tehran");
  const [cityNameDisplay, setCityNameDisplay] =
    useState("Tehran");
  const [error, setError] = useState("");
  const [suggestion, setSuggestion] = useState<string[]>(
    []
  );
  const [showSuggeest, setShowSuggest] = useState(false);
  const [place, setPlace] = useAtom(placeAtom);
  const [loadingCity, setLoadingCity] =
    useAtom(loadingCityAtom);

  async function handleInputChange(value: string) {
    setCity(value);
    if (value.length >= 3) {
      try {
        const res: CityResponse = await axios.get(
          `http://api.openweathermap.org/data/2.5/find?q=${value}&appid=e8088829b0d4947e09ae641493599950`
        );
        const suggest = res.data.list.map(
          (item) => item.name
        );
        setSuggestion(suggest);
        setError("");
        setShowSuggest(true);
      } catch (error) {
        setSuggestion([]);
        setShowSuggest(false);
      }
    } else {
      setSuggestion([]);
      setShowSuggest(false);
    }
  }

  function handleSuggestClick(value: string) {
    setLoadingCity(true);
    setTimeout(() => {
      setPlace(city);
      setCity(city);
      setCityNameDisplay(city);
      setShowSuggest(false);
      setLoadingCity(false);
    }, 1000);
  }

  function handleSubmitSearch(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setLoadingCity(true);
    if (suggestion.length === 0) {
      setError("Location Not Found");
      setLoadingCity(false);
    } else {
      setError("");
      setTimeout(() => {
        setPlace(city);
        setLoadingCity(false);
        setShowSuggest(false);
        setCityNameDisplay(city);
        setCity(city);
      }, 1000);
    }
  }

  return (
    <nav className="shadow-sm sticky top-0 left-0 z-10 bg-white">
      <div className="h-20 w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        <p className="flex items-center justify-center gap-2">
          <span className="inline-block text-gray-500 text-3xl">
            Weather
          </span>
          <MdWbSunny className="text-3xl mt-1 text-yellow-300" />
        </p>

        {/*  */}

        <section className="flex gap-2 items-center">
          <MdOutlineLocationOn className="text-3xl" />
          <h2 className="text-slate-900/80 text-base mr-1">
            {cityNameDisplay}
          </h2>
          <div className="relative">
            <SearchBox
              value={city}
              onChange={(e) =>
                handleInputChange(e.target.value)
              }
              onSubmit={handleSubmitSearch}
            />
            {((showSuggeest && suggestion.length > 0) ||
              error) && (
              <SuggestionBox
                {...{
                  suggestion,
                  handleSuggestClick,
                  error,
                }}
              />
            )}
          </div>
        </section>
      </div>
    </nav>
  );
}
