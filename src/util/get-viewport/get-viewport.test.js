import {expect} from "chai";
import jsdom from "mocha-jsdom";
import getViewport from "./index";

describe("getViewport", function() {
  jsdom();
  it("should return the width and height of the window", () => {
    const {width, height} = getViewport();
    expect(width).to.equal(window.innerWidth);
    expect(height).to.equal(window.innerHeight);
  });
});
