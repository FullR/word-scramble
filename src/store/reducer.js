import initialState from "./initial-state";
import actions from "./actions";

import loadState from "./action-handlers/load-state";
import createUser from "./action-handlers/create-user";
import deleteUser from "./action-handlers/delete-user";
import selectUser from "./action-handlers/select-user";
import showSentenceHint from "./action-handlers/show-sentence-hint";
import showLetterHint from "./action-handlers/show-letter-hint";
import moveLetter from "./action-handlers/move-letter";
import shuffleLetters from "./action-handlers/shuffle-letters";
import clearUserData from "./action-handlers/clear-user-data";
import completePuzzle from "./action-handlers/complete-puzzle";
import startPuzzle from "./action-handlers/start-puzzle";

const actionHandlers = {
  [actions.LOAD_STATE]: loadState,
  [actions.CREATE_USER]: createUser,
  [actions.DELETE_USER]: deleteUser,
  [actions.SELECT_USER]: selectUser,
  [actions.SHOW_SENTENCE_HINT]: showSentenceHint,
  [actions.SHOW_LETTER_HINT]: showLetterHint,
  [actions.MOVE_LETTER]: moveLetter,
  [actions.SHUFFLE_LETTERS]: shuffleLetters,
  [actions.CLEAR_USER_DATA]: clearUserData,
  [actions.COMPLETE_PUZZLE]: completePuzzle,
  [actions.START_PUZZLE]: startPuzzle
};

export default function reducer(state=initialState, action={}) {
  const {type} = action;
  if(actionHandlers.hasOwnProperty(type)) {
    console.time(`action ${type}`);
    const newState = actionHandlers[type](state, action);
    console.timeEnd(`action ${type}`);
    return newState;
  } else {
    console.log(`Unknown action type: ${type}`);
    return state;
  }
}
