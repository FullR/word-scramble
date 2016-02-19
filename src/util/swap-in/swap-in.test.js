import {expect} from "chai";
import swapIn from "./index";

describe("swapIn", function() {
  it("should swap two elements in an array at the passed indexes", () => {
    expect(
      swapIn([1, 2, 3, 4, 5], 1, 3)
    ).to.deep.equal([1,4,3,2,5])
  });

  it("should not modify the original array", () => {
    const input = [1, 2, 3];
    const output = swapIn(input, 0, 2);
    expect(input).to.deep.equal([1, 2, 3]);
  });

  it("should throw an error if either index is out of bounds", () => {
    expect(
      () => swapIn([1, 2, 3], 5, 0)
    ).to.throw(Error);

    expect(
      () => swapIn([1, 2, 3], 1, 10)
    ).to.throw(Error);
  });
});
