import {expect} from "chai";
import createUserPuzzles from "./index";
import puzzleData from "puzzle-data";

describe("createPuzzles", function() {
  it("should create a puzzle for each element in the puzzle data", () => {
    expect(createUserPuzzles("a").length).to.be.equal(puzzleData.length);
  });
});
