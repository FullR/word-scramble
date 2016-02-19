import puzzleData from "puzzle-data";

const puzzleDataIndex = puzzleData.reduce((index, puzzle) => {
  index[puzzle.id] = puzzle;
  return index;
}, {});

export default function getPuzzleData(id) {
  if(puzzleDataIndex.hasOwnProperty(id)) {
    return puzzleDataIndex[id];
  } else {
    throw new Error(`No puzzle exists with the id ${id}`);
  }
}
