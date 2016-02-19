import {expect} from "chai";
import replaceWhere from "./index";

describe("replaceWhere", function() {
  it("should replace elements in the passed array that pass the predicate function with the result of the transform function", () => {
    const data = [1, 2, 3, 4, 5];
    const predicate = (n) => n % 2 === 0;
    const transform = (n) => n * 10;
    const result = replaceWhere(data, predicate, transform);
    expect(result).to.deep.equal([1, 20, 3, 40, 5]);
  });
});
