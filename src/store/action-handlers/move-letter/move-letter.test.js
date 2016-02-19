import {expect} from "chai";
import {createStore} from "redux";
import reducer from "../../reducer";
import actions from "../../actions";
import moveLetter from "./index";

describe("moveLetter", function() {
  it("should swap unselected letters when one is dragged to the other", () => {
    const state = {
      puzzles: [
        {
          id: "testpuzzle",
          selected: [{letter: null},{letter: null},{letter: null},{letter: null},{letter: null},{letter: null}],
          unselected: [{letter: "f"},{letter: "o"},{letter: "o"},{letter: "b"},{letter: "a"},{letter: "r"}]
        }
      ]
    };

    const action = {
      type: actions.MOVE_LETTER,
      puzzleId: state.puzzles[0].id,
      start: {
        location: "unselected",
        index: 0
      },
      end: {
        location: "unselected",
        index: 3
      }
    };

    const newState = moveLetter(state, action);
    expect(newState.puzzles[0]).to.deep.equal({
      id: "testpuzzle",
      selected: [{letter: null},{letter: null},{letter: null},{letter: null},{letter: null},{letter: null}],
      unselected: [{letter: "b"},{letter: "o"},{letter: "o"},{letter: "f"},{letter: "a"},{letter: "r"}]
    });
  });

  it("should move the target letter to the first blank unselected space when a selected letter is moved to it", () => {
    const state = {
      puzzles: [
        {
          id: "testpuzzle",
          selected: [{letter: null},{letter: "b"},{letter: "c"},{letter: null},{letter: null},{letter: null}],
          unselected: [{letter: "a"},{letter: null},{letter: null},{letter: "d"},{letter: "e"},{letter: "f"}]
        }
      ]
    };
    const action = {
      type: actions.MOVE_LETTER,
      puzzleId: "testpuzzle",
      start: {location: "selected", index: 2},
      end: {location: "selected", index: 1}
    };
    const newState = moveLetter(state, action);

    expect(newState.puzzles[0]).to.deep.equal({
      id: "testpuzzle",
      selected: [{letter: null},{letter: "c"},{letter: null},{letter: null},{letter: null},{letter: null}],
      unselected: [{letter: "a"},{letter: "b"},{letter: null},{letter: "d"},{letter: "e"},{letter: "f"}]
    });
  });

  it("should swap the letters when moving an unselected letter to a selected letter", () => {
    const state = {
      puzzles: [
        {
          id: "testpuzzle",
          selected: [{letter: null},{letter: "b"},{letter: "c"},{letter: null},{letter: null},{letter: null}],
          unselected: [{letter: null},{letter: "a"},{letter: null},{letter: "d"},{letter: "e"},{letter: "f"}]
        }
      ]
    };
    const action = {
      type: actions.MOVE_LETTER,
      puzzleId: "testpuzzle",
      start: {location: "unselected", index: 1},
      end: {location: "selected", index: 1}
    };
    const newState = moveLetter(state, action);

    expect(newState.puzzles[0]).to.deep.equal({
      id: "testpuzzle",
      selected: [{letter: null},{letter: "a"},{letter: "c"},{letter: null},{letter: null},{letter: null}],
      unselected: [{letter: null},{letter: "b"},{letter: null},{letter: "d"},{letter: "e"},{letter: "f"}]
    });
  });

  it("should swap the letters when moving a selected letter to an unselected letter", () => {
    const state = {
      puzzles: [
        {
          id: "testpuzzle",
          selected: [{letter: null},{letter: "b"},{letter: "c"},{letter: null},{letter: null},{letter: null}],
          unselected: [{letter: null},{letter: "a"},{letter: null},{letter: "d"},{letter: "e"},{letter: "f"}]
        }
      ]
    };
    const action = {
      type: actions.MOVE_LETTER,
      puzzleId: "testpuzzle",
      start: {location: "selected", index: 1},
      end: {location: "unselected", index: 1}
    };
    const newState = moveLetter(state, action);

    expect(newState.puzzles[0]).to.deep.equal({
      id: "testpuzzle",
      selected: [{letter: null},{letter: "a"},{letter: "c"},{letter: null},{letter: null},{letter: null}],
      unselected: [{letter: null},{letter: "b"},{letter: null},{letter: "d"},{letter: "e"},{letter: "f"}]
    });
  });

  it("shouldn't change the puzzle when the start letter is blank", () => {
    const state = {
      puzzles: [
        {
          id: "testpuzzle",
          selected: [{letter: null},{letter: "b"},{letter: "c"},{letter: null},{letter: null},{letter: null}],
          unselected: [{letter: null},{letter: "a"},{letter: null},{letter: "d"},{letter: "e"},{letter: "f"}]
        }
      ]
    };
    const moveActions = [
      {type: actions.MOVE_LETTER, puzzleId: "testpuzzle", start: {location: "unselected", index: 0}, end: {location: "selected", index: 1}},
      {type: actions.MOVE_LETTER, puzzleId: "testpuzzle", start: {location: "unselected", index: 0}, end: {location: "unselected", index: 1}},
      {type: actions.MOVE_LETTER, puzzleId: "testpuzzle", start: {location: "selected", index: 0}, end: {location: "unselected", index: 1}},
      {type: actions.MOVE_LETTER, puzzleId: "testpuzzle", start: {location: "selected", index: 0}, end: {location: "selected", index: 1}}
    ];

    let newState = moveActions.reduce((state, action) => moveLetter(state, action), state);
    expect(newState.puzzles[0]).to.equal(state.puzzles[0]);
  });

  it("should not mutate the state", () => {
    const state = {
      puzzles: [
        {
          id: "testpuzzle",
          selected: [{letter: null},{letter: null},{letter: null},{letter: null},{letter: null},{letter: null}],
          unselected: [{letter: "f"},{letter: "o"},{letter: "o"},{letter: "b"},{letter: "a"},{letter: "r"}]
        }
      ]
    };

    const action = {
      type: actions.MOVE_LETTER,
      puzzleId: state.puzzles[0].id,
      start: {
        location: "unselected",
        index: 0
      },
      end: {
        location: "unselected",
        index: 3
      }
    };

    moveLetter(state, action);
    expect(state).to.deep.equal({
      puzzles: [
        {
          id: "testpuzzle",
          selected: [{letter: null},{letter: null},{letter: null},{letter: null},{letter: null},{letter: null}],
          unselected: [{letter: "f"},{letter: "o"},{letter: "o"},{letter: "b"},{letter: "a"},{letter: "r"}]
        }
      ]
    });
  });

  it("should throw an error if an invalid location is passed", () => {
    const state = {
      puzzles: [
        {
          id: "testpuzzle",
          selected: [{letter: null},{letter: "b"},{letter: "c"},{letter: null},{letter: null},{letter: null}],
          unselected: [{letter: null},{letter: "a"},{letter: null},{letter: "d"},{letter: "e"},{letter: "f"}]
        }
      ]
    };
    const action1 = {type: actions.MOVE_LETTER, puzzleId: "testpuzzle", start: {location: "narp", index: 0}, end: {location: "selected", index: 1}};
    const action2 = {type: actions.MOVE_LETTER, puzzleId: "testpuzzle", start: {location: "selected", index: 0}, end: {location: "farp", index: 1}};
    expect(
      () => moveLetter(state, action1)
    ).to.throw(Error);
    expect(
      () => moveLetter(state, action2)
    ).to.throw(Error);
  });

  it("should throw an error if an invalid location index is passed", () => {
    const state = {
      puzzles: [
        {
          id: "testpuzzle",
          selected: [{letter: null},{letter: "b"},{letter: "c"},{letter: null},{letter: null},{letter: null}],
          unselected: [{letter: null},{letter: "a"},{letter: null},{letter: "d"},{letter: "e"},{letter: "f"}]
        }
      ]
    };
    const action1 = {type: actions.MOVE_LETTER, puzzleId: "testpuzzle", start: {location: "selected", index: -7}, end: {location: "selected", index: 1}};
    const action2 = {type: actions.MOVE_LETTER, puzzleId: "testpuzzle", start: {location: "selected", index: 0}, end: {location: "selected", index: 100}};
    expect(
      () => moveLetter(state, action1)
    ).to.throw(Error);
    expect(
      () => moveLetter(state, action2)
    ).to.throw(Error);
  });
});
