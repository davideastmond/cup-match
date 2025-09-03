import type { CupColor } from "../../types/cup-color";

export function checkPuzzleGuess(
  puzzle: CupColor[],
  guess: CupColor[]
): { solved: boolean; matches: number } {
  if (puzzle.length !== guess.length) return { solved: false, matches: 0 };

  let matches = 0;
  for (let i = 0; i < puzzle.length; i++) {
    if (puzzle[i] === guess[i]) matches++;
  }

  return { solved: matches === puzzle.length, matches };
}
