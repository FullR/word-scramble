import {expect} from "chai";
import getPuzzleData from "./index";
import puzzleData from "puzzle-data";

describe("getPuzzleData", function() {
  it("should return a puzzle given its id", () => {
    expect(getPuzzleData(puzzleData[0].id)).to.be.equal(puzzleData[0]);
  });

  it("should throw an error when an invalid puzzle id is passed", () => {
    expect(() => getPuzzleData("invalid id")).to.throw(Error);
  })
});
