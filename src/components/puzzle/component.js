import React from "react";
import {noop} from "lodash";
import bembam from "bembam";
import getEventKey from "util/get-event-key";
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
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  componentDidMount() {
    store.dispatch({
      type: actions.START_PUZZLE,
      puzzleId: this.props.puzzleId
    });

    window.addEventListener("keydown", this.onKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyPress);
  }

  onKeyPress(event) {
    const code = getEventKey(event);
    if(code !== 123) {
      event.preventDefault();
    }

    const {unselected, selected} = this.props;
    const c = String.fromCharCode(code).toLowerCase();
    const unselectedIndex = unselected.findIndex((choice) => choice.letter === c);

    if(unselectedIndex !== -1) {
      this.autoMoveLetter({location: "unselected", index: unselectedIndex});
    }
  }

  moveLetter(start, end) {
    store.dispatch({
      start, end,
      type: actions.MOVE_LETTER,
      puzzleId: this.props.puzzleId
    });
  }

  autoMoveLetter(start) {
    const {selected, unselected} = this.props;
    const end = start.location === "selected" ? {
      location: "unselected",
      index: unselected.findIndex(({letter}) => !letter)
    } : {
      location: "selected",
      index: selected.findIndex(({letter}) => !letter)
    };

    this.moveLetter(start, end);
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

  hideCheckAnswerModal() {
    this.setState({checkingAnswer: false});
  }

  showCorrectAnswer() {
    store.dispatch({
      type: actions.COMPLETE_PUZZLE,
      puzzleId: this.props.puzzleId
    });

    this.setState({
      checkingAnswer: false
    });
  }

  getLetterSize() {
    const {length} = this.props.unselected;

    switch(true) {
      case length >= 10: return "small";
      default: return "large";
    }
  }

  getCorrectLetters() {
    return this.props.word.split("").map((letter, i) => ({letter, id: i}));
  }

  getBlankLetters() {
    return this.props.word.split("").map((_, i) => ({letter: null, id: i}));
  }

  render() {
    const {
      selected,
      unselected,
      definition,
      sentence,
      complete,
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
    const topLetters = complete ? this.getCorrectLetters() : selected;
    const bottomLetters = complete ? this.getBlankLetters() : unselected;

    return (
      <Screen {...this.props} className={cn}>
        <div className={cn.el("top")}>
          <div className={cn.el("definition")}>
            <strong>Definition:</strong><br/>
            {definition}
          </div>
          <div className={cn.el("selected")}>
            {topLetters.map(({id, letter}, i) => {
              const value = {location: "selected", index: i};
              const onDrop = (start) => this.moveLetter(start, value);
              return (
                <DnDLetter
                  key={id}
                  letter={letter}
                  value={value}
                  onDrop={onDrop}
                  glowing={selectedHintIndex === i}
                  empty={!letter}
                  size={letterSize}
                  disabled={complete}
                  onDoubleClick={this.autoMoveLetter.bind(this, value)}
                />
              );
            })}
          </div>

          <div className={cn.el("unselected")}>
            {bottomLetters.map(({id, letter}, i) => {
              const value = {location: "unselected", index: i};
              const onDrop = (start) => this.moveLetter(start, value);
              return (
                <DnDLetter
                  key={id}
                  letter={letter}
                  value={value}
                  onDrop={onDrop}
                  glowing={unselectedHintIndex === i}
                  empty={!letter}
                  size={letterSize}
                  disabled={complete}
                  onDoubleClick={this.autoMoveLetter.bind(this, value)}
                />
              );
            })}
          </div>

          <div className={cn.el("shuffle-button-container")}>
            <Button onClick={this.shuffleLetters.bind(this)}>Shuffle</Button>
          </div>
        </div>

        <div className={cn.el("bottom")}>
          <div className={cn.el("hint-row")}>
            <Button onClick={this.showLetterHint.bind(this)} className={cn.el("letter-hint-button")}>
              Letter Hint
            </Button>
            <Button onClick={this.showSentenceHint.bind(this)} disabled={showingSentenceHint} className={cn.el("sentence-hint-button")}>
              Sentence Hint
            </Button>
            <div className={cn.el("sentence-hint")}>
              {showingSentenceHint ?
                <div>{sentence}</div> :
                null
              }
            </div>
            <Button onClick={this.checkAnswer.bind(this)} className={cn.el("check-answer-button")}>Check Answer</Button>
          </div>

          <Link className={cn.el("menu-link")} onClick={onBack}>Menu</Link>
          <Arrow className={cn.el("skip-button")} onClick={onNext}>{complete ? "Next" : "Skip"}</Arrow>
        </div>

        {checkingAnswer ?
          <ShowAnswerModal
            correct={this.isCorrect()}
            onClose={this.hideCheckAnswerModal.bind(this)}
            onSkip={onNext}
            onShowCorrect={this.showCorrectAnswer.bind(this)}
          /> :
          null
        }
      </Screen>
    );
  }
}
