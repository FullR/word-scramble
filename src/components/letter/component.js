import React from "react";
import cn from "util/cn";
const letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

export default class Letter extends React.Component {
  static propTypes = {
    letter: React.PropTypes.oneOf(letters)
  };

  render() {
    const {letter, style, className} = this.props;
    const classNames = cn("Letter", letter ? `Letter--${letter}` : `Letter--empty`, className);

    return (
      <div {...this.props} className={classNames}/>
    );
  }
}
