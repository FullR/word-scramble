import React from "react";
import radium from "radium";
import saveState from "decorators/save-state";
import storage from "storage";
import Scramble from "components/scramble";
import Button from "components/button";
import Center from "components/center";
import ConfirmModal from "components/confirm-modal";
import EndGame from "components/end-game";
import LevelButton from "./level-button";
import {getLevelData, getLevelNamespace, getLevelScore} from "level-data-utils";

function isComplete(store, level) {
  return getLevelData(store, level).complete;
}

function isStarted(store, level) {
  return getLevelData(store, level).started;
}

const style = {
  base: {
    fontSize: 22,
    padding: 40,
    height: "100%",
    width: "100%"
  },
  levelButtons: {
    width: 800,
    height: "80%",
    overflowY: "auto",
    border: "2px solid #888",
    borderRadius: 5
  },
  buttonContainer: {
    position: "absolute",
    left: 40,
    bottom: 40
  },
  username: {
    position: "absolute",
    right: 40,
    top: 40
  }
};

@radium
@saveState({namespace: "menu"})
export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.loadState();
  }

  loadState() {
    return this.load({
      levelIndex: 0,
      showingLevel: false
    });
  }

  setCurrentLevel(levelIndex) {
    this.setState({levelIndex, showingLevel: true});
  }

  closeEndGame() {
    this.setState({showingEndGame: false});
  }

  showEndGame() {
    this.setState({showingEndGame: true})
  }

  nextLevel() {
    // skip to next incomplete level (display end of game screen if one isn't found)
    const {levelIndex} = this.state;
    const {levels, store} = this.props;
    const {length} = levels;
    for(var i = levelIndex + 1; i < length; i++) {
      if(!isComplete(store, levels[i])) {
        this.setCurrentLevel(i);
        return;
      }
    }
    this.hideLevel();
    this.showEndGame();
  }

  hideLevel() {
    this.setState({showingLevel: false});
  }

  showClearDataModal() {
    this.setState({
      showingClearDataModal: true
    });
  }

  closeClearDataModal() {
    this.setState({
      showingClearDataModal: false
    });
  }

  clearData() {
    this.props.store.reset();
    this.setState(this.loadState());
  }

  renderLevel() {
    const {user, store, levels} = this.props;
    const {levelIndex} = this.state;
    const levelData = levels[levelIndex];
    return (
      <Scramble {...levelData}
        key={`${user.id}::${levelData.word}`}
        store={store}
        namespace={getLevelNamespace(levelData)}
        onSkip={this.nextLevel.bind(this)}
        onBack={this.hideLevel.bind(this)}
      />
    );
  }

  renderEndGame() {
    const {store, levels} = this.props;
    const allComplete = levels.every((level) => isComplete(store, level));
    return (
      <EndGame
        onBack={this.closeEndGame.bind(this)}
        allComplete={allComplete}
      />
    );
  }

  renderModals() {
    const {showingClearDataModal} = this.state;

    if(showingClearDataModal) {
      const onConfirm = () => {
        this.closeClearDataModal();
        this.clearData();
      };
      const onCancel = this.closeClearDataModal.bind(this);
      return (
        <ConfirmModal onConfirm={onConfirm} onCancel={onCancel}>
          Are you sure you want to reset your progress?<br/>
          This action cannot be undone.
        </ConfirmModal>
      );
    }
  }

  render() {
    const {levels, user, onLogout, store} = this.props;
    const {showingLevel, levelIndex, showingEndGame} = this.state;
    if(showingLevel && levelIndex < levels.length) {
      return this.renderLevel();
    }
    if(showingEndGame) {
      return this.renderEndGame();
    }

    return (
      <div style={style.base}>
        <div style={style.username}>
          {user.name}
        </div>
        <Center style={style.levelButtons}>
          {levels.map((level, i) => {
            const started = isStarted(store, level);
            const complete = isComplete(store, level)
            return (
              <LevelButton
                key={`level-${i}`}
                title={`Word #${i + 1}`}
                store={store}
                onClick={complete ? null : this.setCurrentLevel.bind(this, i)}
                level={level}
              />
            );
          })}
        </Center>
        <div style={style.buttonContainer}>
          <Button onClick={onLogout}>Change User</Button>
          <Button onClick={this.showClearDataModal.bind(this)}>Clear Progress</Button>
        </div>
        {this.renderModals()}
      </div>
    );
  }
}
