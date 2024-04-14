import { SuggestionBoxProps } from "./types";

//This component is the drop down list that appears after user start typing the city name (according to Geo API)
export default function SuggestionBox({
  suggestion,
  handleSuggestClick,
  error,
}: SuggestionBoxProps) {
  return (
    <ul className="mb-4 bg-white absolute border top-11 left-0 border-gray-300 rounded-md min-w-48 flex flex-col gap-1 py-2 px-2">
      {suggestion.map((s, i) => (
        <li
          key={i}
          className="cursor-pointer p-1 rounded hover:bg-gray-200"
          onClick={() => handleSuggestClick(s)} // the function do the same for clicking on a suggestion as the app do for submiting the search form via enter or search icon click
        >
          {s}
        </li>
      ))}
      {error && (
        <li className="text-red-500 p-1">{error}</li> // if Geo API didn't suggest any city, shows an error
      )}
    </ul>
  );
}
