import {expect} from "chai";
import {createStore} from "redux";
import reducer from "../../reducer";
import actions from "../../actions";

describe("action: SELECT_USER", function() {
  it("should set `currentUser` to the dispatched `userId`", () => {
    const store = createStore(reducer);
    store.dispatch({
      type: actions.CREATE_USER,
      name: "testuser"
    });
    const userId = store.getState().users[0].id;
    store.dispatch({
      type: actions.SELECT_USER,
      userId
    });

    expect(store.getState().currentUser).to.be.equal(userId);
  });
});
