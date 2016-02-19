import replaceWhere from "util/replace-where";

export default function showSentenceHint(state, {puzzleId}) {
  const puzzles = replaceWhere(state.puzzles,
    (puzzle) => puzzle.id === puzzleId && !puzzle.showingSentenceHint,
    (puzzle) => ({
      ...puzzle,
      showingSentenceHint: true
    })
  );

  return {...state, puzzles};
}
