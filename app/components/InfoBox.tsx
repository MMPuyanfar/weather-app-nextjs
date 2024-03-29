import { InfoBoxProps } from "./types";

export default function InfoBox(props:InfoBoxProps) {
  return (
    <div className="w-full bg-white border rounded-xl flex py-4 shadow-sm       gap-10 px-6 items-center">
      {props.children}
    </div>
  )
}
