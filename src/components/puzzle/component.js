import React from "react";
import {noop} from "lodash";
import bembam from "bembam";
import dndContext from "dnd-context";
import store from "store";
import actions from "store/actions";
import Screen from "components/screen";
import DnDLetter from "components/dnd-letter";
import Button from "components/button";
import Link from "components/link";
import Arrow from "components/arrow";
import ShowAnswerModal from "components/show-answer-modal";

@dndContext
export default class Puzzle extends React.Component {
  static propTypes = {
    selected: React.PropTypes.array.isRequired,
    unselected: React.PropTypes.array.isRequired,
    definition: React.PropTypes.string,
    sentence: React.PropTypes.string,
    showingSentenceHint: React.PropTypes.bool,
    onBack: React.PropTypes.func,
    onNext: React.PropTypes.func
  };

  static defaultProps = {
    definition: "",
    sentence: "",
    showingSentenceHint: false,
    onBack: noop,
    onNext: noop
  };

  constructor(props) {
    super(props);
    this.state = {checkingAnswer: false};
  }

  componentDidMount() {
    store.dispatch({
      type: actions.START_PUZZLE,
      puzzleId: this.props.puzzleId
    });
  }

  moveLetter(start, end) {
    store.dispatch({
      start, end,
      type: actions.MOVE_LETTER,
      puzzleId: this.props.puzzleId
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

  isCorrect() {
    const {word, selected} = this.props;
    return selected.map(({letter}) => letter).join("") === word;
  }

  checkAnswer() {
    const isCorrect = this.isCorrect();

    if(isCorrect) {
      store.dispatch({
        type: actions.COMPLETE_PUZZLE,
        puzzleId: this.props.puzzleId
      });
    }

    this.setState({checkingAnswer: true});
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
      onBack,
      onNext,
      className
    } = this.props;
    const {checkingAnswer} = this.state;
    const letterSize = this.getLetterSize();
    const cn = bembam("Puzzle", className);

    return (
      <Screen {...this.props} className={cn}>
        <div className={cn.el("top")}>
          <div className={cn.el("selected")}>
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

          <div className={cn.el("unselected")}>
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
          <div className={cn.el("shuffle-button-container")}>
            <Button onClick={this.shuffleLetters.bind(this)}>Shuffle</Button>
          </div>
        </div>

        <div className={cn.el("bottom")}>
          <Button onClick={this.showSentenceHint.bind(this)}>Sentence Hint</Button>
          {showingSentenceHint ?
            <div>{sentence}</div> :
            null
          }
          <Button onClick={this.showLetterHint.bind(this)}>Letter Hint</Button>
          <Button onClick={this.checkAnswer.bind(this)}>Check Answer</Button>
          <Link className={cn.el("menu-link")} onClick={onBack}>Menu</Link>
          <Arrow className={cn.el("skip-button")} onClick={onNext}>Skip</Arrow>
        </div>

        {checkingAnswer ?
          <ShowAnswerModal/> :
          null
        }
      </Screen>
    );
  }
}
