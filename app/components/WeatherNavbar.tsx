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

//This component render the whole navbar in the app.
export default function WeatherNavbar() {
  // The logic part of the component is responsible for handling the data coming from the city search input and its submission via different ways
  // When the city search input is submitted, several thing happen at the same time
  const [city, setCity] = useState("Tehran"); //the city holds the city search input value
  const [cityNameDisplay, setCityNameDisplay] =
    useState("Tehran"); //this hold the value to be shown alongside the search box
  const [error, setError] = useState(""); //holds the potential error message if city is not found
  const [suggestion, setSuggestion] = useState<string[]>(
    []
  ); // holds the Geo API response to show city suggestion under the search box
  const [showSuggeest, setShowSuggest] = useState(false); //determines whether to show the suggestions or not
  const [place, setPlace] = useAtom(placeAtom); //uses Jotai lib (global state management) to pass the place to the page component(parent)
  const [loadingCity, setLoadingCity] =
    useAtom(loadingCityAtom); // uses Jotai lib (global state management) to pass a boolean to determine the loading phase for the app page

  //city search input change handler. uses geo api to recieve a list of suggested cities when user start typing
  async function handleInputChange(value: string) {
    setCity(value);
    if (value.length >= 3) {
      try {
        const res: CityResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=e8088829b0d4947e09ae641493599950`
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

  //city search click on suggestion handler. (when user clicks on a city name in the suggestion box below the search box)
  function handleSuggestClick(value: string) {
    setLoadingCity(true);
    setTimeout(() => {
      setPlace(value);
      setCity(value);
      setCityNameDisplay(value);
      setShowSuggest(false);
      setLoadingCity(false);
    }, 1000); //using timeout to cover the fetching time of data
  }

  //city search form submit handler (clicking on search icon or hitting enter)
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
      }, 1000); //using timeout to cover the fetching time of data
    }
  }

  return (
    <>
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
            <div className="relative hidden md:flex">
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
      <section className="flex max-w-7xl px-3 md:hidden justify-center">
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
    </>
  );
}
