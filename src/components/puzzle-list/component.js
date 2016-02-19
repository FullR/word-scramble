import React from "react";
import cn from "util/cn";

export default class PuzzleList extends React.Component {
  render() {
    const {className} = this.props;
    const classNames = cn("Puzzle-list", className);

    return (
      <div {...this.props} className={classNames}/>
    );
  }
}
