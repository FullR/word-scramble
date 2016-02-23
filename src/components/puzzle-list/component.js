import React from "react";
import bembam from "bembam";

export default class PuzzleList extends React.Component {
  render() {
    const {className} = this.props;
    const cn = bembam("Puzzle-list", className);

    return (
      <div {...this.props} className={cn}/>
    );
  }
}
