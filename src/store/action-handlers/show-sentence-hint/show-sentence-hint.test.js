import {expect} from "chai";
import {createStore} from "redux";
import reducer from "../../reducer";
import actions from "../../actions";

describe("showSentenceHint", function() {
  it("should enable `showingSentenceHint`", () => {
    const store = createStore(reducer);
    store.dispatch({
      type: actions.CREATE_USER,
      name: "testname"
    });
    store.dispatch({
      type: actions.SHOW_SENTENCE_HINT,
      puzzleId: store.getState().puzzles[0].id
    });

    expect(store.getState().puzzles[0].showingSentenceHint).to.be.equal(true);
  });
});
