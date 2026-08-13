import { useRef, useState } from "react";
import { useCupElements } from "../../context/cup-elements-context";
import type { CupColor } from "../../types/cup-color";
import Cup from "../cup/Cup";

type CupCollectionProps = {
  onRearranged?: () => void;
  disabled?: boolean;
};
export default function CupCollection({
  onRearranged,
  disabled,
}: CupCollectionProps) {
  const { cupElements, setCupElements } = useCupElements();
  const [colorSelected, setColorSelected] = useState<CupColor | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  function renderCups() {
    return cupElements?.map((color) => (
      <Cup
        color={color}
        key={color}
        onSelected={() => handleSelectLogic(color)}
        selected={color === colorSelected}
        disabled={disabled}
      />
    ));
  }

  function handleSelectLogic(color: CupColor) {
    if (color === colorSelected) {
      setColorSelected(null);
      return;
    }

    if (colorSelected && color) {
      swapColorPositions(colorSelected, color);
      return;
    }

    setColorSelected(color);
  }

  function swapColorPositions(currentColor: CupColor, toBeSwapped: CupColor) {
    const currentIndex = cupElements.indexOf(currentColor);
    const swapIndex = cupElements.indexOf(toBeSwapped);

    if (currentIndex === -1 || swapIndex === -1 || currentIndex === swapIndex)
      return;

    const newCupElements = [...cupElements];
    newCupElements[currentIndex] = toBeSwapped;
    newCupElements[swapIndex] = currentColor;

    if (onRearranged) {
      onRearranged();
    }

    const currentCup = document.getElementById(currentColor);
    const swapCup = document.getElementById(toBeSwapped);
    const container = containerRef.current;

    if (!currentCup || !swapCup || !container) {
      setCupElements(newCupElements);
      setColorSelected(null);
      return;
    }

    const gap = Number.parseFloat(
      getComputedStyle(container).columnGap ||
        getComputedStyle(container).gap ||
        "0",
    );
    const travelDistance =
      (swapIndex - currentIndex) * (currentCup.offsetWidth + gap);

    currentCup.style.transition =
      "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)";
    swapCup.style.transition = "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)";
    currentCup.style.transform = `translateX(${travelDistance}px)`;
    swapCup.style.transform = `translateX(${-travelDistance}px)`;

    setColorSelected(null);

    window.setTimeout(() => {
      setCupElements(newCupElements);
      currentCup.style.transform = "";
      swapCup.style.transform = "";
      currentCup.style.transition = "";
      swapCup.style.transition = "";
    }, 550);
  }

  return (
    <div ref={containerRef} className="flex gap-4">
      {renderCups()}
    </div>
  );
}
