
export function getLevelNamespace(level) {
  return `level-${level.word}`;
}

export function getLevelData(store, level) {
  return store.get(getLevelNamespace(level)) || {started: false};
}

export function getLevelScore(store, level, sentenceHintValue=1) {
  const {letterHintsUsed, showingSentenceHint, showingCorrect} = getLevelData(store, level);
  const total = level.word.length;
  const score = showingCorrect ?
    0 :
    total - (letterHintsUsed ? letterHintsUsed.length : 0) - (showingSentenceHint ? sentenceHintValue : 0)

  return {total, score};
}
