import {sample} from "lodash";
import getPuzzleData from "util/get-puzzle-data";
import replaceWhere from "util/replace-where";

export default function showLetterHint(state, {puzzleId}) {
  const puzzle = state.puzzles.find((puzzle) => puzzle.id === puzzleId);
  const {selected, unselected, letterHintsUsed} = puzzle;
  const {word, maxLetterHints} = getPuzzleData(puzzle.puzzleDataId);
  let selectedHintIndex;

  if(letterHintsUsed.length >= maxLetterHints) return state; // no more hints

  const validUnselected = unselected
    .map((choice, index) => ({choice, index})) // retain original indexes
    .filter(({choice}) => !!choice.letter); // remove blanks

  if(!validUnselected.length) return state; // if all unselected are blank

  const unselectedHintIndex = sample(validUnselected).index;
  const targetUnselected = unselected[unselectedHintIndex];

  const targetSelectedEntry = word.split("")
    .map((letter, index) => ({letter, index})) // preserve original index
    .filter(({index}) => letterHintsUsed.indexOf(index) === -1) // unused hints only
    .find(({letter, index}) => letter === targetUnselected.letter && selected[index].letter !== targetUnselected.letter);

  if(targetSelectedEntry) {
    selectedHintIndex = targetSelectedEntry.index;
  } else {
    selectedHintIndex = word.indexOf(targetUnselected.letter);
  }

  return {
    ...state,
    puzzles: replaceWhere(state.puzzles,
      (puzzle) => puzzle.id === puzzleId,
      (puzzle) => ({
        ...puzzle,
        selectedHintIndex, unselectedHintIndex,
        letterHintsUsed: puzzle.letterHintsUsed.concat(selectedHintIndex)
      })
    )
  };
}
