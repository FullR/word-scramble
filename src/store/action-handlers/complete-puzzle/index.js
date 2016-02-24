import replaceWhere from "util/replace-where";

export default function completePuzzle(state, {puzzleId}) {
  return {
    ...state,
    puzzles: replaceWhere(state.puzzles,
      (puzzle) => puzzle.id === puzzleId,
      (puzzle) => ({
        ...puzzle,
        complete: true,
        selectedHintIndex: null,
        unselectedHintIndex: null
      })
    )
  };
}
