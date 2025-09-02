import { useState } from "react";
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
    setColorSelected(color);
    // Swap the colors if both are selected
    if (colorSelected && color) {
      swapColorPositions(colorSelected, color);
    }
  }

  function swapColorPositions(currentColor: CupColor, toBeSwapped: CupColor) {
    //  Take the current cupElements and swap the currentColor and toBeSwapped
    // if (!cupElements) return;

    const currentIndex = cupElements.indexOf(currentColor);
    const swapIndex = cupElements.indexOf(toBeSwapped);

    if (currentIndex !== -1 && swapIndex !== -1) {
      if (currentIndex === swapIndex) return; // No need to swap the same cup
      const newCupElements = [...cupElements];
      newCupElements[currentIndex] = toBeSwapped;
      newCupElements[swapIndex] = currentColor;
      onRearranged && onRearranged();

      const currentCup = document.getElementById(currentColor);
      const swapCup = document.getElementById(toBeSwapped);

      currentCup?.classList.add("lift");
      swapCup?.classList.add("lift");
      setColorSelected(null);

      setTimeout(() => {
        setCupElements(newCupElements);
        currentCup?.classList.remove("lift");
        swapCup?.classList.remove("lift");
      }, 500);
    }
  }

  return <div className="flex gap-4">{renderCups()}</div>;
}
