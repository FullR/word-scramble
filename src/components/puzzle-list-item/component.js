import React from "react";
import cn from "util/cn";

export default class PuzzleListItem extends React.Component {
  static propTypes = {
    height: React.PropTypes.any
  };

  static defaultProps = {
    height: 25
  };

  render() {
    const {height, style, className} = this.props;
    const classNames = cn("Puzzle-list-item", className);
    const dynamicStyle = {...style, height};

    return (
      <div {...this.props} className={classNames} style={dynamicStyle}/>
    );
  }
}
