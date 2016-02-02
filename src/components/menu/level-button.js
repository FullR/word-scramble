import React from "react";
import radium from "radium";
import Block from "components/block";
import ScoreMedal from "components/score-medal";
import {getLevelData, getLevelScore} from "level-data-utils";

const style = {
  base: {
    cursor: "pointer",
    borderTop: "1px solid #444",
    width: "100%",
    fontSize: 25,
    height: 100,
    verticalAlign: "middle",
    padding: 10,
    ":hover": {
      color: "blue"
    }
  },
  complete: {
    cursor: "default",
    color: "#999",
    ":hover": {
      color: "#999"
    }
  },
  medal: {
    display: "block",
    float: "right",
    //marginTop: 10
  },
  incompleteText: {
    color: "#C00"
  }
};

@radium
export default class LevelButton extends React.Component {
  render() {
    const {level, title, store} = this.props;
    const {started, complete} = getLevelData(store, level);
    const {score, total} = getLevelScore(store, level);
    const percent = (score / total) * 100;

    return (
      <Block {...this.props} style={[style.base, complete ? style.complete : null]}>
        {complete ?
          [
            <Block key="text">{level.word}</Block>,
            <ScoreMedal key="medal" score={percent} height={60} style={style.medal}>
              {score}/{total}
            </ScoreMedal>
          ] :
          <Block>{title} {started ? <span style={style.incompleteText}>Incomplete</span> : null}</Block>
        }
      </Block>
    );
  }
}
