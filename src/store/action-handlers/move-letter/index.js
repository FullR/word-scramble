import replaceWhere from "util/replace-where";
import swapIn from "util/swap-in";
import swapBetween from "util/swap-between";

export default function moveLetter(state, {start, end, puzzleId}) {
  return {
    ...state,
    puzzles: replaceWhere(state.puzzles,
      (puzzle) => puzzle.id === puzzleId,
      (puzzle) => ({
        ...puzzle,
        ...movePuzzleLetter(puzzle, start, end),
        selectedHintIndex: null,
        unselectedHintIndex: null
      })
    )
  };
}

function validateMovement(puzzle, source, target) {
  // check location (must be unselected or selected)
  if(source.location !== "unselected" && source.location !== "selected") throw new Error(`Invalid move location ${source.location}`);
  if(target.location !== "unselected" && target.location !== "selected") throw new Error(`Invalid move location ${target.location}`);
  // check for index out of bounds
  if(source.index < 0 || source.index >= puzzle[source.location].length) throw new Error(`Source index out of bounds: ${source.index}`);
  if(target.index < 0 || target.index >= puzzle[target.location].length) throw new Error(`Target index out of bounds: ${target.index}`);
}

function movePuzzleLetter(puzzle, source, target) {
  validateMovement(puzzle, source, target);
  const {index: sourceIndex, location: sourceLocation} = source;
  const {index: targetIndex, location: targetLocation} = target;
  let selected, unselected;

  if((sourceLocation === "unselected" && !puzzle.unselected[sourceIndex].letter) ||
     (sourceLocation === "selected" && !puzzle.selected[sourceIndex].letter)) {
    return puzzle; // if attempting to move a blank, do nothing
  }

  switch(true) {
    case sourceLocation === "selected" && targetLocation === "selected":
      return selectedToSelected(puzzle, sourceIndex, targetIndex);
    case sourceLocation === "unselected" && targetLocation === "unselected":
      return unselectedToUnselected(puzzle, sourceIndex, targetIndex);
    case sourceLocation === "unselected" && targetLocation === "selected":
      return selectedToUnselected(puzzle, sourceIndex, targetIndex);
    case sourceLocation === "selected" && targetLocation === "unselected":
      return unselectedToSelected(puzzle, sourceIndex, targetIndex);
  }
}

function selectedToSelected(puzzle, sourceIndex, targetIndex) {
  let selected = swapIn(puzzle.selected, sourceIndex, targetIndex);
  let unselected;

  if(selected[sourceIndex].letter) { // if the target isn't empty, move it to the unselected
    [selected, unselected] = swapBetween(selected, puzzle.unselected, sourceIndex, puzzle.unselected.findIndex((v) => !v.letter));
  } else {
    unselected = puzzle.unselected;
  }
  return {selected, unselected};
}

function unselectedToUnselected(puzzle, sourceIndex, targetIndex) {
  return {unselected: swapIn(puzzle.unselected, sourceIndex, targetIndex)};
}

function selectedToUnselected(puzzle, sourceIndex, targetIndex) {
  const [unselected, selected] = swapBetween(puzzle.unselected, puzzle.selected, sourceIndex, targetIndex);
  return {selected, unselected};
}

function unselectedToSelected(puzzle, sourceIndex, targetIndex) {
  const [selected, unselected] = swapBetween(puzzle.selected, puzzle.unselected, sourceIndex, targetIndex);
  return {selected, unselected};
}
