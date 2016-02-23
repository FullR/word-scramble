import React from "react";
import bembam from "bembam";

export default class PuzzleListItem extends React.Component {
  static propTypes = {
    height: React.PropTypes.any
  };

  static defaultProps = {
    height: 25
  };

  render() {
    const {height, style, className} = this.props;
    const cn = bembam("Puzzle-list-item", className);
    const dynamicStyle = {...style, height};

    return (
      <div {...this.props} className={cn} style={dynamicStyle}/>
    );
  }
}
