import { List } from "./types";

//This component shows today temps (now, feels like, min, max)
interface TodayTempsProps {
  firstData: List | undefined;
}

export default function TodayTemps(props: TodayTempsProps) {
  return (
    <div className="flex flex-col px-4 items-center gap-1">
      <span className="text-5xl">
        {Math.round(props.firstData?.main.temp ?? 0)}°
      </span>
      <p className="text-xs space-x-1 whitespace-nowrap">
        <span>Feels like</span>
        <span>
          {Math.round(props.firstData?.main.feels_like ?? 0)}°
        </span>
      </p>
      <p className="text-xs space-x-2">
        <span>
          {Math.round(props.firstData?.main.temp_min ?? 0)}
          °↓{" "}
        </span>
        <span>
          {" "}
          {Math.round(props.firstData?.main.temp_max ?? 0)}
          °↑
        </span>
      </p>
    </div>
  );
}
