import { useEffect, useState } from "react";
import { useCupElements } from "../../context/cup-elements-context";
import { checkPuzzleGuess } from "../../lib/utils/check-puzzle-guess";

import CupCollection from "../cup-collection/Cup-Collection";

export default function Stage() {
  const { cupElements, solution, generatePuzzle } = useCupElements();

  const [matches, setMatches] = useState<number>(0);
  const [puzzleSolved, setPuzzleSolved] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(1);

  const handleCheckPuzzle = () => {
    // Check if the puzzle is solved
    const { solved, matches } = checkPuzzleGuess(solution, cupElements);
    setMatches(matches);
    setPuzzleSolved(solved);
  };

  useEffect(() => {
    generatePuzzle(5);
  }, []);

  return (
    <div>
      <div>
        <CupCollection disabled={puzzleSolved} />
      </div>
      <div className="mt-4 flex justify-end">
        <button
          className={`${puzzleSolved ? "hidden" : ""}`}
          onClick={handleCheckPuzzle}
          disabled={puzzleSolved}
        >
          Check
        </button>
      </div>
      <div>
        <p>
          Matches: {matches} of {solution.length}
        </p>

        {puzzleSolved && (
          <p className="text-green-500 font-bold">Puzzle Solved!</p>
        )}
      </div>
    </div>
  );
}
