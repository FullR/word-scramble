import {shuffle} from "lodash";
import uid from "util/uid";
import puzzleData from "puzzle-data";
import createUserPuzzles from "util/create-user-puzzles";

export default function createUser(state, {name}) {
  name = name.trim();
  if(!name.length) return state;

  const userId = uid();
  return {
    ...state,
    users: [{id: userId, name}, ...state.users],
    currentUser: userId,
    puzzles: [
      ...state.puzzles,
      ...createUserPuzzles(userId)
    ]
  }
}
