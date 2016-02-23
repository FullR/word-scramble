import {expect} from "chai";
import {createStore} from "redux";
import reducer from "store/reducer";
import actions from "store/actions";

describe("clearUserData", function() {
  it("should replace a users puzzles with new puzzles", () => {
    const store = createStore(reducer);
    store.dispatch({
      type: actions.CREATE_USER,
      name: "test user"
    });
    const state = store.getState();
    const user = state.users[0];
    const userPuzzles = state.puzzles.filter((puzzle) => puzzle.userId === user.id);

    store.dispatch({
      type: actions.CLEAR_USER_DATA,
      userId: user.id
    });

    const newUserPuzzles = store.getState().puzzles.filter((puzzle) => puzzle.userId === user.id);

    expect(newUserPuzzles.length).to.be.equal(userPuzzles.length);

    newUserPuzzles.forEach((puzzle, i) => {
      expect(puzzle.id).to.not.equal(userPuzzles[i].id)
    });
  });
});
