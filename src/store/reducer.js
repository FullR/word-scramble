import initialState from "./initial-state";
import actions from "./actions";

import loadState from "./action-handlers/load-state/index";
import createUser from "./action-handlers/create-user/index";
import deleteUser from "./action-handlers/delete-user/index";
import selectUser from "./action-handlers/select-user/index";
import showSentenceHint from "./action-handlers/show-sentence-hint/index";
import showLetterHint from "./action-handlers/show-letter-hint/index";
import moveLetter from "./action-handlers/move-letter/index";
import shuffleLetters from "./action-handlers/shuffle-letters/index";

const actionHandlers = {
  [actions.LOAD_STATE]: loadState,
  [actions.CREATE_USER]: createUser,
  [actions.DELETE_USER]: deleteUser,
  [actions.SELECT_USER]: selectUser,
  [actions.SHOW_SENTENCE_HINT]: showSentenceHint,
  [actions.SHOW_LETTER_HINT]: showLetterHint,
  [actions.MOVE_LETTER]: moveLetter,
  [actions.SHUFFLE_LETTERS]: shuffleLetters
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
