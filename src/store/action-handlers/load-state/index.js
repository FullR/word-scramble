// Used to persist state without having a hard dependency on the persistence method
export default function loadState(state, {state: newState}) {
  return newState;
}
