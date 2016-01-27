import React from "react";
import radium from "radium";
import Block from "./block";

/* Centers its contents vertically and horizontally */

const style = {
  base: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
  },

  vcenter: {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)"
  },

  hcenter: {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, 0)"
  }
};

@radium
export default class Center extends React.Component {
  render() {
    return (
      <Block {...this.props} style={[style.base, this.props.style]}/>
    );
  }
}

@radium
class VCenter extends React.Component {
  render() {
    return (
      <Block {...this.props} style={[style.vcenter, this.props.style]}/>
    );
  }
}

@radium
class HCenter extends React.Component {
  render() {
    return (
      <Block {...this.props} style={[style.hcenter, this.props.style]}/>
    );
  }
}

Center.VCenter = VCenter;
Center.HCenter = HCenter;
