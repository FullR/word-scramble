import {expect} from "chai";
import startPuzzle from "./index";

describe("startedPuzzle", function() {
  it("should mark a puzzle as started", () => {
    const state = {
      puzzles: [
        {id: "0", started: false}
      ]
    };

    expect(
      startPuzzle(state, {puzzleId: "0"}).puzzles[0].started
    ).to.be.equal(true);
  });

  it("should not mutate the puzzle", () => {
    const state = {
      puzzles: [
        {id: "0", started: false}
      ]
    };

    expect(
      startPuzzle(state, {puzzleId: "0"}).puzzles[0]
    ).to.not.equal(state.puzzles[0]);
  })
});
