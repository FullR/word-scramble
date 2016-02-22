import React from "react";
import {noop} from "lodash";
import cn from "util/cn";
import dndContext from "dnd-context";
import Screen from "components/screen";
import DnDLetter from "components/dnd-letter";
import Button from "components/button";
import store from "store";
import actions from "store/actions";

@dndContext
export default class Puzzle extends React.Component {
  static propTypes = {
    onLetterMove: React.PropTypes.func,
    selected: React.PropTypes.array.isRequired,
    unselected: React.PropTypes.array.isRequired,
    definition: React.PropTypes.string,
    sentence: React.PropTypes.string,
    showingSentenceHint: React.PropTypes.bool
  };

  static defaultProps = {
    onLetterMove: noop,
    definition: "",
    sentence: "",
    showingSentenceHint: false
  };

  moveLetter(start, end) {
    store.dispatch({
      type: actions.MOVE_LETTER,
      puzzleId: this.props.puzzleId,
      start, end
    });
  }

  showSentenceHint() {
    store.dispatch({
      type: actions.SHOW_SENTENCE_HINT,
      puzzleId: this.props.puzzleId
    });
  }

  showLetterHint() {
    store.dispatch({
      type: actions.SHOW_LETTER_HINT,
      puzzleId: this.props.puzzleId
    });
  }

  shuffleLetters() {
    store.dispatch({
      type: actions.SHUFFLE_LETTERS,
      puzzleId: this.props.puzzleId
    })
  }

  getLetterSize() {
    const {length} = this.props.unselected;

    switch(true) {
      case length <= 5: return "large";
      case length >= 10: return "small";
      default: return "medium";
    }
  }

  render() {
    const {
      selected,
      unselected,
      definition,
      sentence,
      showingSentenceHint,
      selectedHintIndex,
      unselectedHintIndex,
      className
    } = this.props;
    const letterSize = this.getLetterSize();
    const classNames = cn("Puzzle", className);

    return (
      <Screen {...this.props} className={classNames}>
        <div className="Puzzle__top">
          <div className="Puzzle__selected">
            {selected.map(({id, letter}, i) => {
              const value = {location: "selected", index: i};
              const onDrop = (start) => this.moveLetter(start, value);
              return (
                <DnDLetter
                  key={id}
                  letter={letter}
                  value={value}
                  onDrop={onDrop}
                  glowing={selectedHintIndex === i}
                  size={letterSize}
                />
              );
            })}
          </div>

          <div className="Puzzle__unselected">
            {unselected.map(({id, letter}, i) => {
              const value = {location: "unselected", index: i};
              const onDrop = (start) => this.moveLetter(start, value);
              return (
                <DnDLetter
                  key={id}
                  letter={letter}
                  value={value}
                  onDrop={onDrop}
                  glowing={unselectedHintIndex === i}
                  size={letterSize}
                />
              );
            })}
          </div>

          <div>{definition}</div>
          <div className="Puzzle__shuffle-button-container">
            <Button onClick={this.shuffleLetters.bind(this)}>Shuffle</Button>
          </div>
        </div>

        <div className="Puzzle__bottom">
          <Button onClick={this.showSentenceHint.bind(this)}>Sentence Hint</Button>
          {showingSentenceHint ?
            <div>{sentence}</div> :
            null
          }
          <Button onClick={this.showLetterHint.bind(this)}>Letter Hint</Button>
        </div>
      </Screen>
    );
  }
}
