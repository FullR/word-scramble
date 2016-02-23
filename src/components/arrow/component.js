import React from "react";
import bembam from "bembam";

export default class Arrow extends React.Component {
  static propTypes = {
    color: React.PropTypes.oneOf(["green", "red", "blue", "black"]),
    flipped: React.PropTypes.bool
  };

  static defaultProps = {
    color: "green",
    flipped: false
  };

  render() {
    const {color, flipped, className} = this.props;
    const cn = bembam("Arrow", className)
      .mod("flipped", flipped)
      .mod(`color-${color}`);

    return (
      <div {...this.props} className={cn}>
        <div className={cn.el("content")}>
          <div className={cn.el("image")}/>
          <div className={cn.el("text")}>{this.props.children}</div>
        </div>
      </div>
    );
  }
}
