import React from "react";
import cn from "util/cn";

export default class Frame extends React.Component {
  render() {
    const {empty, disabled, glowing, className} = this.props;
    const classNames = cn(
      "Frame",
      empty ? "Frame--empty" : null,
      disabled ? "Frame--disabled" : null,
      glowing ? "Frame--glowing" : null,
      className
    );

    return (
      <div {...this.props} className={classNames}/>
    );
  }
}
