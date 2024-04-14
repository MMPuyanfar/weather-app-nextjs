import {
  getDayOfMonth,
  getMonthNumber,
  getWeekDay,
} from "../helper";
import { type DateInfoProp } from "./types";

// This component gets a date object and turns it into the week day, and date in dd/mm/yyyy format
export default function DateInfo(prop: DateInfoProp) {
  return (
    <>
      <h2 className="flex gap-1 text-2xl items-end mb-2">
        <p className="text-2xl">
          {getWeekDay(prop.dateObj)}
        </p>
        <span className="w-2"></span>
        <p className="text-sm">
          {getDayOfMonth(prop.dateObj)}/
          {getMonthNumber(prop.dateObj)}/
          {prop.dateObj.getFullYear()}
        </p>
      </h2>
    </>
  );
}
