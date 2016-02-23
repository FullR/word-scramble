import replaceWhere from "util/replace-where";

export default function startPuzzle(state, {puzzleId}) {
  return {
    ...state,
    puzzles: replaceWhere(state.puzzles,
      (puzzle) => puzzle.id === puzzleId,
      (puzzle) => ({
        ...puzzle,
        started: true
      })
    )
  };
}
