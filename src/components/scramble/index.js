import React from "react";
import shuffle from "lodash/shuffle";
import sample from "lodash/sample";
import isNumber from "lodash/isNumber";
import saveState from "decorators/save-state";
import windowListener from "decorators/window-listener";
import Block from "components/block";
import Relative from "components/relative";
import Center from "components/center";
import CheckAnswerModal from "./check-answer-modal";
import LetterGroups from "./letter-groups";
import SentenceHint from "./sentence-hint";
import Button from "components/button";
import Arrow from "components/arrow";


const style = {
  base: {
    background: "#fff",
    width: "100%",
    height: "100%"
  },
  top: {
    width: "100%",
    background: "#8cefff",
    borderBottom: "2px solid #444"
  },
  sentenceHint: {
    position: "relative",
    top: 10,
    marginLeft: 20,
    fontSize: 22,
    height: 50,
    left: 20
  },
  definition: {
    width: "100%",
    textAlign: "center",
    fontSize: 24,
    padding: 20
  },
  footer: {
    padding: 20,
    width: "100%"
  },
  letterHintButton: {
    marginRight: 10
  },
  skipButton: {
    //position: "relative",
    //top: -22,
    //verticalAlign: "top",
    //marginLeft: 10
    display: "block"
  },
  checkButton: {
    //verticalAlign: "top"
    display: "block"
  },
  homeButton: {
    position: "absolute",
    color: "#00F",
    left: 20,
    bottom: 20,
    fontSize: 30,
    cursor: "pointer",
    textDecoration: "underline",
    ":hover": {
      color: "#005"
    }
  },
  bottomRightBox: {
    position: "absolute",
    right: 0,
    top: 0
  }
};

@windowListener
@saveState()
export default class Scramble extends React.Component {
  static defaultProps = {
    sentenceHintValue: 1
  };

  constructor(props) {
    super(props);
    const letters = this.letters = props.word.split("");

    this.state = this.load({
      started: true,
      complete: false,
      showingCorrect: false,
      unselected: shuffle(letters.map((letter) => ({value: letter}))),
      selected: letters.map(() => ({value: null})),
      showingSentenceHint: false,
      selectedHintIndex: null,
      unselectedHintIndex: null,
      letterHintsUsed: [],
      checkingAnswer: false
    });
  }

  get score() {
    return this.maxScore - this.penaltyPoints;
  }

  get maxScore() {
    return this.props.word.length;
  }

  get maxLetterHints() {
    const {maxLetterHints} = this.props;
    if(isNumber(maxLetterHints)) {
      return maxLetterHints;
    } else {
      return Math.floor(this.props.word.length / 3);
    }
  }

  get penaltyPoints() {
    const {sentenceHintValue} = this.props;
    const {letterHintsUsed, showingSentenceHint} = this.state
    return letterHintsUsed.length + (showingSentenceHint ? sentenceHintValue : 0);
  }

  get scorePercent() {
    return (this.score / this.maxScore) * 100;
  }

  canCheckAnswer() {
    const {complete, selected} = this.state;
    return !complete && selected.every(({value}) => value !== null);
  }

  canUseLetterHint() {
    const {complete, letterHintsUsed} = this.state;
    const {maxLetterHints} = this;

    return !complete && letterHintsUsed.length < maxLetterHints;
  }

  canUseSentenceHint() {
    const {complete, showingSentenceHint} = this.state;
    return !complete && !showingSentenceHint;
  }

  isCorrect() {
    const {word} = this.props;
    return this.state.selected.every(({value}, i) => word[i] === value);
  }

  checkAnswer() {
    this.setState({
      checkingAnswer: true,
      complete: this.isCorrect()
    });
  }

  closeModals() {
    this.setState({checkingAnswer: false});
  }

  showSentenceHint() {
    this.setState({showingSentenceHint: true});
  }

  showLetterHint() {
    const {maxLetterHints} = this;
    const {selected, unselected, letterHintsUsed} = this.state;

    if(letterHintsUsed.length >= maxLetterHints) return; // no more hints left

    const validUnselected = unselected
      .map((choice, index) => ({choice, index})) // retain original indexes
      .filter(({choice}) => choice.value !== null);

    if(!validUnselected.length) return; // no unselected choices

    const unselectedHintIndex = sample(validUnselected).index;
    const targetUnselected = unselected[unselectedHintIndex];
    const targetSelectedEntry = this.props.word.split("")
      .map((letter, index) => ({letter, index})) // preserve original index
      .filter(({index}) => letterHintsUsed.indexOf(index) === -1) // unused hints only
      .find(({letter, index}) => letter === targetUnselected.value && selected[index].value !== targetUnselected.value);

    let selectedHintIndex;

    if(targetSelectedEntry) {
     selectedHintIndex = targetSelectedEntry.index;
    } else {
      selectedHintIndex = this.props.word.indexOf(targetUnselected.value);
    }

    this.setState({
      selectedHintIndex, unselectedHintIndex,
      letterHintsUsed: letterHintsUsed.concat(selectedHintIndex)
    });
  }

  onChange({unselected, selected}) {
    this.setState({
      unselected,
      selected,
      selectedHintIndex: null,
      unselectedHintIndex: null
    });
  }

  showCorrectAnswer() {
    this.setState({
      complete: true,
      showingCorrect: true
    });
    this.closeModals();
  }

  renderModals() {
    const {checkingAnswer} = this.state;
    const {onSkip, onBack} = this.props;
    if(!checkingAnswer) return;
    const isCorrect = this.isCorrect();
    const close = this.closeModals.bind(this);

    return (
      <CheckAnswerModal
        score={this.scorePercent}
        correct={isCorrect}
        onClose={close}
        onNextClick={onSkip}
        onShowClick={this.showCorrectAnswer.bind(this)}
        onOverlayClick={this.isCorrect() ? null : close}
      />
    );
  }

  render() {
    const {selected, unselected, showingSentenceHint, selectedHintIndex, unselectedHintIndex, letterHintsUsed, showingCorrect, complete} = this.state;
    const {sentence, definition, window} = this.props;
    const {maxLetterHints} = this;
    const letterGroupProps = showingCorrect ? {
      selected: this.letters.map((letter) => ({value: letter})),
      unselected: this.letters.map(() => ({value: null})),
      disabled: true
    } : {
      selected: selected,
      unselected: unselected,
      onChange: this.onChange.bind(this),
      unselectedHintIndex: unselectedHintIndex,
      selectedHintIndex: selectedHintIndex
    };

    return (
      <Block style={style.base}>
        <Block style={style.top}>
          <Block style={style.definition}>
            Definition:<br/>
            {definition}
          </Block>
          <LetterGroups {...letterGroupProps} height={window.height - 320}/>
        </Block>

        <Block style={style.footer}>
          <Button style={style.letterHintButton} onClick={this.showLetterHint.bind(this)} disabled={!this.canUseLetterHint()}>
            Letter Hint
            {letterHintsUsed.length ?
              [<br/>, `${maxLetterHints - letterHintsUsed.length} left`] :
              null
            }
          </Button>

          <Button onClick={this.showSentenceHint.bind(this)} disabled={!this.canUseSentenceHint()}>Sentence<br/>Hint</Button>
          <SentenceHint style={style.sentenceHint} hidden={!showingSentenceHint}>{sentence}</SentenceHint>

          <div style={style.bottomRightBox}>
            <Button style={style.checkButton} onClick={this.checkAnswer.bind(this)} hidden={!this.canCheckAnswer()}>Check Answer</Button>
            <Arrow style={style.skipButton} onClick={this.props.onSkip} width={175}>{complete ? "Next" : "Skip"}</Arrow>
          </div>
        </Block>

        <span style={style.homeButton} onClick={this.props.onBack}>Menu</span>
        {this.renderModals()}
      </Block>
    );
  }
}
