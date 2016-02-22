import {shuffle} from "lodash";
import replaceWhere from "util/replace-where";

export default function shuffleLetters(state, {puzzleId}) {
  return {
    ...state,
    puzzles: replaceWhere(state.puzzles,
      (puzzle) => puzzle.id === puzzleId,
      (puzzle) => ({
        ...puzzle,
        unselected: shuffle(puzzle.unselected)
      })
    )
  };
}
