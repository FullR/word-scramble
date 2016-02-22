import {expect} from "chai";
import shuffleLetters from "./index";

describe("shuffleLetters", function() {
  it("should shuffle the unselected letters in a puzzle", () => {
    const state = {
      puzzles: [
        {
          id: "testpuzzle",
          unselected: [
            {letter: "a"},
            {letter: "b"},
            {letter: "c"},
            {letter: "d"},
            {letter: "e"},
            {letter: "f"},
            {letter: "g"},
            {letter: "h"},
            {letter: "i"},
            {letter: "j"},
            {letter: "k"},
            {letter: "l"},
            {letter: "m"}
          ]
        }
      ]
    };

    const resultState = shuffleLetters(state, {puzzleId: "testpuzzle"});
    const resultLetters = resultState.puzzles[0].unselected;
    expect(resultLetters).to.not.deep.equal(state.puzzles[0].unselected);
  });
});
