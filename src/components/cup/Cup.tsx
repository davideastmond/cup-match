import { useMemo } from "react";
import { colorMap, type CupColor } from "../../types/cup-color";
import "./style.css";
type CupProps = {
  color: CupColor;
  selected?: boolean;
  onSelected?: (selected: boolean) => void;
  disabled?: boolean;
};

export default function Cup(props: CupProps) {
  const backgroundColorFromProps = useMemo<string>(() => {
    return (colorMap[props.color] as string) || "bg-white";
  }, []);

  const handleSelected = () => {
    if (props.disabled) return;
    props.onSelected && props.onSelected(!props.selected);
  };
  return (
    <div
      id={props.color}
      className={`cup hover:cursor-pointer ${backgroundColorFromProps} flex ${
        props.selected
          ? "border-[1.5px] border-purple-100 ring-1 ring-purple-100 animate-bounce"
          : ""
      } ${props.disabled ? "opacity-50 pointer-events-none" : ""}`}
      onClick={handleSelected}
    >
      <div className="h-[9.5px] bg-white w-full self-end border-black border-1"></div>
    </div>
  );
}
