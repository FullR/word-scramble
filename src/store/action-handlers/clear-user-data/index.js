import createUserPuzzles from "util/create-user-puzzles";

export default function clearUserData(state, {userId}) {
  return {
    ...state,
    puzzles: [
      ...state.puzzles.filter((puzzle) => puzzle.userId !== userId),
      ...createUserPuzzles(userId)
    ]
  };
}
