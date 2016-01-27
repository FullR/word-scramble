import React from "react";
import radium from "radium";

const style = {
  base: {position: "relative", display: "inline-block"}
};

@radium
export default class Relative extends React.Component {
  render() {
    const {left, right, top, bottom} = this.props;

    return (
      <div {...this.props} style={[style.base, {left, right, top, bottom}, this.props.style]}/>
    );
  }
}
