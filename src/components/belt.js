import React from "react";
import radium from "radium";

/* Block that spans the width of its container */

const style = {
  position: "absolute",
  width: "100%",
  textAlign: "center"
};

@radium
export default class Belt extends React.Component {
  render() {
    const {top, bottom} = this.props;
    const dynamicStyle = {top, bottom};
    return (<div {...this.props} style={[style, dynamicStyle, this.props.style]}/>);
  }
}
