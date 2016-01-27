import React from "react";
import shuffle from "lodash/shuffle";
import sample from "lodash/sample";
import isNumber from "lodash/isNumber";
import persists from "decorators/persists";
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
    background: "#8cefff",
    width: "100%",
    height: "100%"
  },
  content: {
    width: "100%",
    height: "100%"
  },
  header: {
    width: "100%",
    height: 50
  },
  main: {
    width: "100%",
    background: "#FFF",
    padding: 20
  },
  footer: {
    padding: 20
  },
  sentenceHint: {
    position: "relative",
    top: 10,
    marginLeft: 20,
    fontSize: 22,
    height: 50
  },
  definitionBox: {
    marginTop: 20,
    width: "100%",
    height: 50,
    fontSize: 24,
    textAlign: "center",
    background: "#FFF"
  },
  letterHintButton: {
    marginRight: 10
  },
  skipButton: {
    display: "block"
  },
  checkButton: {
    display: "block",
    marginBottom: 20
  },
  homeButton: {
    position: "absolute",
    left: 20,
    bottom: 20
  },
  bottomRightBox: {
    position: "absolute",
    right: 20,
    bottom: 20
  }
};

@persists()
export default class Scramble extends React.Component {
  static defaultProps = {
    sentenceHintValue: 1
  };

  constructor(props) {
    super(props);
    const letters = props.word.split("");
    this.state = this.load({
      started: true,
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

  canCheckAnswer() {
    return this.state.selected.every(({value}) => value !== null);
  }

  isCorrect() {
    const {word} = this.props;
    return this.state.selected.every(({value}, i) => word[i] === value);
  }

  checkAnswer() {
    this.setState({checkingAnswer: true});
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

  renderModals() {
    const {checkingAnswer} = this.state;
    const {onSkip, onBack} = this.props;
    if(!checkingAnswer) return;
    const isCorrect = this.isCorrect();

    return (
      <CheckAnswerModal
        correct={isCorrect}
        onMenuClick={onBack}
        onNextClick={onSkip}
        onOverlayClick={this.isCorrect() ? null : this.closeModals.bind(this)}
      />
    );
  }

  render() {
    const {selected, unselected, showingSentenceHint, selectedHintIndex, unselectedHintIndex, letterHintsUsed} = this.state;
    const {sentence, definition} = this.props;
    const {maxLetterHints} = this;

    return (
      <Block style={style.base}>
        <Block style={style.header}>

        </Block>
        <Block style={style.main}>
          <LetterGroups
            rowSpacing={300}
            selected={selected}
            unselected={unselected}
            onChange={this.onChange.bind(this)}
            unselectedHintIndex={unselectedHintIndex}
            selectedHintIndex={selectedHintIndex}
          >
            <Block style={style.definitionBox}>
              <Center>
                Definition:<br/>
                {definition}
              </Center>
            </Block>
          </LetterGroups>
        </Block>

        <Block style={style.footer}>
          <Button style={style.letterHintButton} onClick={this.showLetterHint.bind(this)} disabled={letterHintsUsed.length >= maxLetterHints}>
            Letter Hint<br/>({maxLetterHints - letterHintsUsed.length}/{maxLetterHints})
          </Button>
          <Button onClick={this.showSentenceHint.bind(this)} disabled={showingSentenceHint}>Sentence<br/>Hint</Button>
          <Relative left={20}>
            <SentenceHint style={style.sentenceHint} hidden={!showingSentenceHint}>{sentence}</SentenceHint>
          </Relative>
        </Block>

        <Button style={style.homeButton} onClick={this.props.onBack}>Home</Button>
        <div style={style.bottomRightBox}>
          <Button style={style.checkButton} onClick={this.checkAnswer.bind(this)} disabled={!this.canCheckAnswer()}>Check Answer</Button>
          <Arrow style={style.skipButton} onClick={this.props.onSkip}>Skip</Arrow>
        </div>
        {this.renderModals()}
      </Block>
    );
  }
}
