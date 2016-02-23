import {shuffle} from "lodash";
import uid from "util/uid";
import puzzleData from "puzzle-data";

export default function createUserPuzzles(userId) {
  return puzzleData.map((puzzle) => {
    const letters = puzzle.word.split("");
    return {
      userId,
      id: uid(),
      puzzleDataId: puzzle.id,
      started: false,
      complete: false,
      showingSentenceHint: false,
      letterHintsUsed: [],
      selectedHintIndex: null,
      unselectedHintIndex: null,
      selected: letters.map(() => ({id: uid(), letter: null})),
      unselected: shuffle(letters.map((letter) => ({id: uid(), letter})))
    }
  });
}
