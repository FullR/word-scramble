import {expect} from "chai";
import {range, uniq} from "lodash";
import uid from "./index";

describe("uid", function() {
  it("should generate unique ids", () => {
    const ids = range(1000).map(uid);
    // check 1000 generated ids to make sure they're all unique?
    expect(ids.length).to.be.equal(uniq(ids).length);
  });
});
