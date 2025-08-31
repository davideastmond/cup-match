import { useMemo } from "react";
import type { CupColor } from "../../types/cup-color";
import "./style.css";
type CupProps = {
  color: CupColor;
  selected?: boolean;
  onSelected?: (selected: boolean) => void;
  disabled?: boolean;
};

export default function Cup(props: CupProps) {
  const backgroundColorFromProps = useMemo<string>(() => {
    const colorMap = {
      blue: "bg-blue-500",
      red: "bg-red-500",
      green: "bg-green-500",
      yellow: "bg-yellow-500",
      purple: "bg-purple-500",
      white: "bg-white",
      pink: "bg-pink-500",
      orange: "bg-orange-500",
    };

    return (colorMap[props.color] as string) || "bg-white";
  }, []);

  const handleSelected = () => {
    if (props.disabled) return;
    props.onSelected && props.onSelected(!props.selected);
  };
  return (
    <div
      id={props.color}
      className={`cup hover:cursor-pointer ${backgroundColorFromProps} ${
        props.selected
          ? "border-4 border-yellow-100 ring-4 ring-yellow-100 animate-bounce"
          : ""
      } ${props.disabled ? "opacity-50 pointer-events-none" : ""}`}
      onClick={handleSelected}
    ></div>
  );
}
