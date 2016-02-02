import React from "react";
import Medal from "components/medal";

function getMedalFromScore(score) {
  if(score >= 100) return "gold";
  if(score >= 65) return "silver";
  if(score >= 0) return "bronze";
  return null;
}

export default class ScoreMedal extends React.Component {
  render() {
    const {score} = this.props;
    return (<Medal {...this.props} color={getMedalFromScore(score)}/>);
  }
}
