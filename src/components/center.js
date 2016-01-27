import React from "react";
import radium from "radium";
import Block from "./block";

/* Centers its contents vertically and horizontally */

const style = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)"
};

@radium
export default class Center extends React.Component {
  render() {
    return (
      <Block {...this.props} style={[style, this.props.style]}/>
    );
  }
}
