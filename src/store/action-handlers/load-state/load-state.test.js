import {expect} from "chai";
import loadState from "./index";

describe("action: LOAD_STATE", function() {
  it("should replace the state", () => {
    expect(loadState(null, {state: "test"})).to.be.equal("test");
  });
});
