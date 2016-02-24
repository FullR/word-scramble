import React from "react";
import bembam from "bembam";
const letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const sizes = ["small", "large"];

export default class Letter extends React.Component {
  static propTypes = {
    letter: React.PropTypes.oneOf(letters),
    size: React.PropTypes.oneOf(sizes)
  };

  static defaultProps = {
    size: "large"
  };

  render() {
    const {letter, size, style, className} = this.props;
    const classNames = bembam("Letter", className)
      .mod(`size-${size}`)
      .mod(`letter-${letter}`);

    return (
      <div {...this.props} className={classNames}/>
    );
  }
}
