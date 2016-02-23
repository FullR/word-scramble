import {expect} from "chai";
import {createStore} from "redux";
import reducer from "../../reducer";
import actions from "../../actions";

describe("action: DELETE_USER", function() {
  it("should remove a user and their puzzle data", () => {
    const store = createStore(reducer);
    store.dispatch({
      type: actions.CREATE_USER,
      name: "testname"
    });
    const userId = store.getState().users[0].id;
    store.dispatch({
      type: actions.DELETE_USER,
      userId: userId
    });
    const state = store.getState();
    const userPuzzles = state.puzzles.filter((puzzle) => puzzle.userId === userId);

    expect(state.users).to.deep.equal([]);
    expect(userPuzzles.length).to.be.equal(0);
  });
});
