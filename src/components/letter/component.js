import React from "react";
import cn from "util/cn";
const letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const sizes = ["small", "medium", "large"];

export default class Letter extends React.Component {
  static propTypes = {
    letter: React.PropTypes.oneOf(letters),
    size: React.PropTypes.oneOf(sizes)
  };

  static defaultProps = {
    size: "medium"
  };

  render() {
    const {letter, size, style, className} = this.props;
    const classNames = cn(
      "Letter",
      `Letter--size-${size}`,
      letter ? `Letter--letter-${letter}` : null,
      className
    );

    return (
      <div {...this.props} className={classNames}/>
    );
  }
}
