import {expect} from "chai";
import loadState from "./index";

describe("loadState", function() {
  it("should replace the state", () => {
    expect(loadState(null, {state: "test"})).to.be.equal("test");
  });
});
