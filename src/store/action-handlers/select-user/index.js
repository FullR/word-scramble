export default function selectUser(state, {userId}) {
  return {...state, currentUser: userId};
}
