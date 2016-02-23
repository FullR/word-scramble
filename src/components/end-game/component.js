import React from "react";
import {noop} from "lodash";
import Screen from "components/screen";
import Button from "components/button";
import bembam from "bembam";

export default class EndGame extends React.Component {
  static propTypes = {
    puzzles: React.PropTypes.array.isRequired,
    onBack: React.PropTypes.func
  };

  isComplete() {
    return this.props.puzzles.every((puzzle) => puzzle.complete);
  }

  render() {
    const {onBack, className} = this.props;
    const cn = bembam("End-game", className);

    return (
      <Screen {...this.props} className={cn}>
        <div className={cn.el("header")}>congratulations!</div>
        {this.isComplete() ?
          <div className={cn.el("message")}>
            You've completed all the puzzles.<br/>
            Return to the menu and clear your progress to play again
          </div> :
          <div className={cn.el("message")}>
            You've finished the game, but there's still some unsolved puzzles.<br/>
            Return to the menu to finish the unsolved puzzles.
          </div>
        }
        <div className={cn.el("back-button-container")}>
          <Button className={cn.el("back-button")} onClick={onBack}>Menu</Button>
        </div>
      </Screen>
    );
  }
}
