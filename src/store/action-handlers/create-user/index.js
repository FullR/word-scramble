import {shuffle} from "lodash";
import uid from "util/uid";
import puzzleData from "puzzle-data";

export default function createUser(state, {name}) {
  name = name.trim();
  if(!name.length) return state;

  const id = uid();
  return {
    ...state,
    users: [{id, name}, ...state.users],
    currentUser: id,
    puzzles: [
      ...state.puzzles,
      ...puzzleData.map((puzzle) => {
        const letters = puzzle.word.split("");
        return {
          id: uid(),
          userId: id,
          puzzleDataId: puzzle.id,
          started: false,
          showingSentenceHint: false,
          letterHintsUsed: [],
          selectedHintIndex: null,
          unselectedHintIndex: null,
          selected: letters.map(() => ({id: uid(), letter: null})),
          unselected: shuffle(letters.map((letter) => ({id: uid(), letter})))
        }
      })
    ]
  }
}
