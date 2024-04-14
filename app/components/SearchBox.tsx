import { IoSearch } from "react-icons/io5";
import { type SearchBarProps } from "./types";

//This component is form to enable user change the city they want to see its weather forecast
export default function SearchBox(props: SearchBarProps) {
  return (
    <form
      action=""
      className="flex relative items-center justify-center h-10"
      onSubmit={props.onSubmit} // this function triggers when user click on search icon or hit enter
      autoComplete="off" // disables browser suggestions according to previous values
    >
      <input
        type="text"
        spellCheck="false" // disables spellcheck and avoids those red curly lines under the text
        autoComplete="off" // disables browser suggestions according to previous values
        name="city"
        value={props.value} //controlled input value
        onChange={props.onChange} //both for controlling input value and using the real time input value in Geo API
        placeholder="Search location..."
        className="px-3 py-2 w-48 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 h-full"
      />
      <button className="px-4 py-2 bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600 whitespace-nowrap h-full">
        <IoSearch className="text-lg" />
      </button>
    </form>
  );
}
