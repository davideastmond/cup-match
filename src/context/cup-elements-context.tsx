import { createContext, useContext, useState, type ReactNode } from "react";
import type { CupColor } from "../types/cup-color";
const MAX_CUP_COUNT = 8;
const MIN_CUP_COUNT = 4;
type CupElementsContextType = {
  cupElements: CupColor[];
  setCupElements: (cups: CupColor[]) => void;
  resetCupElements: () => void;
  generatePuzzle: (numberOfCups?: number) => void;
  solution: CupColor[];
};

const CupElementsContext = createContext<CupElementsContextType | undefined>(
  undefined
);

export const CupElementsProvider = ({ children }: { children: ReactNode }) => {
  const [cupElements, setCupElements] = useState<CupColor[]>([]);

  const [solution, setSolution] = useState<CupColor[]>([]);

  const resetCupElements = (numberOfCups: number = MAX_CUP_COUNT) =>
    setCupElements(shuffleCupElements(numberOfCups));

  function shuffleCupElements(
    numberOfCups: number = MAX_CUP_COUNT
  ): CupColor[] {
    if (!numberOfCups || numberOfCups < MIN_CUP_COUNT)
      throw Error("Number of cups must be at least 4 and no greater than 8");
    if (numberOfCups > MAX_CUP_COUNT) throw Error("No more than 8 cups");

    return [
      "green",
      "white",
      "red",
      "yellow",
      "purple",
      "pink",
      "blue",
      "orange",
    ]
      .slice(0, numberOfCups)
      .sort(() => 0.5 - Math.random()) as CupColor[];
  }
  // This generates the solution once per game.
  function generatePuzzle(numberOfCups: number = MAX_CUP_COUNT) {
    setSolution(shuffleCupElements(numberOfCups));
    setCupElements(shuffleCupElements(numberOfCups));
  }

  return (
    <CupElementsContext.Provider
      value={{
        cupElements,
        setCupElements,
        resetCupElements,
        generatePuzzle,
        solution,
      }}
    >
      {children}
    </CupElementsContext.Provider>
  );
};

export function useCupElements() {
  const context = useContext(CupElementsContext);
  if (!context) {
    throw new Error("useCupElements must be used within a CupElementsProvider");
  }
  return context;
}
