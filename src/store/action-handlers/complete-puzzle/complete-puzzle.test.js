import {expect} from "chai";
import completePuzzle from "./index";

describe("completePuzzle", function() {
  it("should mark a puzzle as complete", () => {
    const state = {
      puzzles: [
        {id: "0", complete: false}
      ]
    };

    expect(
      completePuzzle(state, {puzzleId: "0"}).puzzles[0].complete
    ).to.be.equal(true);
  });

  it("should not mutate the puzzle", () => {
    const state = {
      puzzles: [
        {id: "0", complete: false}
      ]
    };

    expect(
      completePuzzle(state, {puzzleId: "0"}).puzzles[0]
    ).to.not.equal(state.puzzles[0]);
  })
});
