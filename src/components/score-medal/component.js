import React from "react";
import bembam from "bembam";
import Medal from "components/medal";

function getMedalType(sentenceHintUsed, letterHintsUsed, maxLetterHints) {
  return "bronze";
}

export default class ScoreMedal extends React.Component {
  static propTypes = {
    score: React.PropTypes.number
  };

  render() {
    const {score, className} = this.props;
    const cn = bembam("Score-medal", className);

    return (
      <Medal {...this.props} className={cn}/>
    );
  }
}
