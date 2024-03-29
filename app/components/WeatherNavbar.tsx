import { MdOutlineLocationOn, MdWbSunny } from "react-icons/md";
import SearchBox from "./SearchBox";

export default function WeatherNavbar() {
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-10 bg-white">
      <div className="h-20 w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        <p className="flex items-center justify-center gap-2">
          <span className="inline-block text-gray-500 text-3xl">Weather</span>
          <MdWbSunny className="text-3xl mt-1 text-yellow-300"/>
        </p>

        {/*  */}

        <section className="flex gap-2 items-center">
          <MdOutlineLocationOn className="text-3xl"/>
          <h2 className="text-slate-900/80 text-base mr-1">Tehran</h2>
          <div>
             <SearchBox />
          </div>
        </section>
      </div>
    </nav>
  );
}
