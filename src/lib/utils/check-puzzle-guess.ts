import type { CupColor } from "../../types/cup-color";

export function checkPuzzleGuess(
  puzzle: CupColor[],
  guess: CupColor[]
): { solved: boolean; matches: number } {
  if (puzzle.length !== guess.length) return { solved: false, matches: 0 };

  const matches = guess.reduce((acc, color, index) => {
    if (color === puzzle[index]) {
      return acc + 1;
    }
    return acc;
  }, 0);
  return { solved: matches === puzzle.length, matches };
}
