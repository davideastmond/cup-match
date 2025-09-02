import { useEffect, useState } from "react";
import { useCupElements } from "../../context/cup-elements-context";
import { checkPuzzleGuess } from "../../lib/utils/check-puzzle-guess";

import { colorMap } from "../../types/cup-color";
import CupCollection from "../cup-collection/Cup-Collection";

export default function Stage() {
  const { cupElements, solution, generatePuzzle } = useCupElements();

  const [matches, setMatches] = useState<number>(0);
  const [puzzleSolved, setPuzzleSolved] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(1);
  const [checkButtonDisabled, setCheckButtonDisabled] =
    useState<boolean>(false);

  const handleCheckPuzzle = () => {
    // Check if the puzzle is solved
    const { solved, matches } = checkPuzzleGuess(solution, cupElements);
    setMatches(matches);
    setCheckButtonDisabled(true);
    setAttempts(attempts + 1);
    if (solved) {
      setPuzzleSolved(true);
    }
  };

  useEffect(() => {
    const selectElement = document.getElementById(
      "cupCount"
    ) as HTMLSelectElement;
    generatePuzzle(Number(selectElement.value));
  }, []);

  const handleRestartGame = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const cupCount = formData.get("cupCount");
    if (cupCount) {
      resetGame();
      generatePuzzle(Number(cupCount));
    }
  };

  const resetGame = () => {
    setPuzzleSolved(false);
    setMatches(0);
    setAttempts(1);
  };

  const handleReArrange = () => {
    console.log("Rearranging cups...");
    setCheckButtonDisabled(false);
  };

  return (
    <div>
      <div>
        <form className="mb-4 flex justify-evenly" onSubmit={handleRestartGame}>
          <label htmlFor="cupCount">Number of Cups: </label>
          <select
            name="cupCount"
            className="bg-white text-black pl-2 pr-2 rounded"
            id="cupCount"
          >
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8" selected>
              8
            </option>
          </select>
          <button type="submit" className="bg-blue-500 text-white rounded p-2">
            Restart Game
          </button>
        </form>
      </div>
      <div className="mt-5">
        <CupCollection disabled={puzzleSolved} onRearranged={handleReArrange} />
      </div>
      <div className="mt-4 flex justify-end">
        <button
          className={`${puzzleSolved ? "hidden " : " "} disabled:bg-slate-200`}
          onClick={handleCheckPuzzle}
          disabled={puzzleSolved || checkButtonDisabled}
        >
          Check
        </button>
      </div>
      <div>
        <p>
          Matches: {matches} of {solution.length}
        </p>

        {puzzleSolved && (
          <div>
            <div>
              <p className="text-green-500 font-bold">Puzzle Solved!</p>
            </div>
            <div>
              {/* Render the solution like pills */}
              {solution.map((cup, index) => (
                <div
                  key={index}
                  className={`inline-block ${colorMap[cup]}  text-black rounded-full px-2 py-1 text-sm font-semibold mr-2`}
                >
                  {cup}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
