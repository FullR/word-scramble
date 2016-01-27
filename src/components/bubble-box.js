import React from "react";
import radium from "radium";
import Color from "color";
import Block from "./block";

const style = {
  display: "inline-block",
  //background: Color("yellow").hexString(),
  width: 100,
  height: 100,
  borderRadius: 15,
  fontSize: 120,
  //border: `2px solid ${Color("yellow").hexString()}`,
  ":hover": {
    //border: `2px solid ${Color("yellow").darken(0.4).hexString()}`
  }
};

@radium
export default class BubbleBox extends React.Component {
  render() {
    return (
      <Block {...this.props} style={[style, this.props.style]}/>
    );
  }
}
