import React from "react";
import bembam from "bembam";

export default class Frame extends React.Component {
  render() {
    const {empty, disabled, glowing, className} = this.props;
    const cn = bembam("Frame", className)
      .mod("empty", empty)
      .mod("disabled", disabled)
      .mod("glowing", glowing);

    return (
      <div {...this.props} className={cn}/>
    );
  }
}
