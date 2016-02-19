export default function deleteUser(state, {userId}) {
  return {
    ...state,
    currentUser: state.currentUser === userId ? null : state.currentUser,
    users: state.users.filter((user) => user.id !== userId),
    puzzles: state.puzzles.filter((puzzle) => puzzle.userId !== userId)
  };
}
