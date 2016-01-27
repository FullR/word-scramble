import React from "react";
import radium from "radium";
import storage from "storage";
import Scramble from "./scramble";
import persists from "decorators/persists";

const levels = [
  {word: "morning", definition: "the time from sunrise to noon", sentence: "Carrie walks her dog every morning before school."},
  {word: "party", definition: "a social gathering", sentence: "Damian’s birthday party is Saturday."},
  {word: "family", definition: "a group of persons who come from the same ancestor", sentence: "The whole family were together for Thanksgiving."},
  {word: "letter", definition: "one of the symbols that make up the alphabet", sentence: "Can you think of a word for each letter of the alphabet?"},
  {word: "children", definition: "young people between infancy and youth", sentence: "All of the children went to the park together."},
  {word: "summer", definition: "the season between spring and autumn", sentence: "This summer, we are going to Louisiana for vacation. "},
  {word: "weather", definition: "the state of atmosphere is regards to heat or cold, wetness or dryness, calm or storm, clearness or cloudiness", sentence: "The weather is supposed to be nice this weekend."},
  {word: "friend", definition: "a person who has a strong liking for and trust in another", sentence: "My best friend and I are taking swimming lessons."},
  {word: "thought", definition: "the act of thinking", sentence: "They thought the new game was very exciting."},
  {word: "money", definition: "something (coins or bills) accepted as a way to pay for goods and sevices", sentence: "Do you have enough money to pay for lunch?"},
];

function getLevelNamespace(level) {
  return `level-${level.word}`;
}

function getLevelData(level) {
  return storage.get(getLevelNamespace(level)) || {started: false};
}

function isComplete(level) {
  const data = getLevelData(level);
  return data.started && data.unselected.every((choice) => choice.value === null);
}

const levelComponents = levels.map((level) => {
  return class Level extends React.Component {
    render() {
      return <Scramble {...this.props} {...level} namespace={getLevelNamespace(level)}/>
    }
  }
});

isComplete(levels[6]);

const style = {
  base: {
    fontSize: 22
  },
  levelLink: {
    cursor: "pointer",
    listStyleType: "none",
    ":hover": {color: "blue"}
  }
};

@persists("menu")
@radium
export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.load({
      levelIndex: 0,
      showingLevel: false
    });
  }

  setCurrentLevel(levelIndex) {
    this.setState({levelIndex, showingLevel: true});
  }

  nextLevel() {
    this.setCurrentLevel(this.state.levelIndex + 1);
  }

  hideLevel() {
    this.setState({showingLevel: false});
  }

  renderLevel() {
    const {levelIndex} = this.state;
    const LevelComponent = levelComponents[levelIndex];
    return (<LevelComponent onSkip={this.nextLevel.bind(this)} onBack={this.hideLevel.bind(this)}/>);
  }

  render() {
    const {showingLevel, levelIndex} = this.state;
    if(showingLevel && levelIndex < levels.length) {
      return this.renderLevel();
    }

    return (
      <div style={style.base}>
        <ul>
          {levels.map((level, i) =>
            <li
              key={`level-${i}`}
              onClick={this.setCurrentLevel.bind(this, i)}
              style={style.levelLink}
              onSkip={this.nextLevel.bind(this)}
              onBack={this.hideLevel.bind(this)}
            >
              {isComplete(level) ?
                level.word :
                `Word #${i + 1}`
              }
            </li>
          )}
        </ul>
      </div>
    );
  }
}
