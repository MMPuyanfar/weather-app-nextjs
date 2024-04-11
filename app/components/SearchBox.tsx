import { IoSearch } from "react-icons/io5";
import { type SearchBarProps } from "./types";

export default function SearchBox(props: SearchBarProps) {
  return (
    <form
      action=""
      className="flex relative items-center justify-center h-10"
      onSubmit={props.onSubmit}
      autoComplete="off"
    >
      {/* https://api.openweathermap.org/data/2.5/forecast?q=tehran&appid=e8088829b0d4947e09ae641493599950&cnt=40 */}
      <input
        type="text"
        spellCheck = 'false'
        autoComplete="false"
        name="city"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search location..."
        className="px-3 py-2 w-48 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 h-full"
      />
      <button className="px-4 py-2 bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600 whitespace-nowrap h-full">
        <IoSearch className="text-lg" />
      </button>
    </form>
  );
}
