import {expect} from "chai";
import swapBetween from "./index";

describe("swapBetween", function() {
  it("should swap elements between two arrays", () => {
    const inputA = [1, 2, 3];
    const inputB = ["a", "b", "c"];

    const [outputA, outputB] = swapBetween(inputA, inputB, 0, 2);

    expect(outputA).to.deep.equal(["c", 2, 3]);
    expect(outputB).to.deep.equal(["a", "b", 1]);
  });

  it("should not modify the original arrays", () => {
    const inputA = [1, 2, 3];
    const inputB = ["a", "b", "c"];

    const [outputA, outputB] = swapBetween(inputA, inputB, 0, 2);

    expect(inputA).to.deep.equal([1, 2, 3]);
    expect(inputB).to.deep.equal(["a", "b", "c"]);
  });

  it("should throw an error if either indexes are out of bounds", () => {
    expect(
      () => swapBetween([1, 2, 3], ["a", "b", "c"], 1, 5)
    ).to.throw(Error);

    expect(
      () => swapBetween([1, 2, 3], ["a", "b", "c"], 5, 1)
    ).to.throw(Error);
  });
});
