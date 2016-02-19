import {expect} from "chai";
import {createStore} from "redux";
import reducer from "../../reducer";
import actions from "../../actions";
import puzzleData from "puzzle-data";

describe("createUser", function() {
  it("should add a user and puzzles for the added user", () => {
    const store = createStore(reducer);
    store.dispatch({
      type: actions.CREATE_USER,
      name: "testname"
    });
    const state = store.getState();
    const user = state.users[0];
    const userPuzzles = state.puzzles.filter((puzzle) => puzzle.userId === user.id);

    expect(user.name).to.be.equal("testname");
    expect(userPuzzles.length).to.be.equal(puzzleData.length);
  });

  it("should do nothing if the username is blank", () => {
    const store = createStore(reducer);
    store.dispatch({
      type: actions.CREATE_USER,
      name: "   "
    });
    expect(store.getState().users.length).to.be.equal(0);
  });
});
