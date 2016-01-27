import React from "react";
import radium from "radium";
import Block from "components/block";
import Center from "components/center";

const image = require("../../images/arrow.png");
const hoverImage = require("../../images/arrow_hover.png");
const style = {
  base: {
    backgroundImage: `url("${image}")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    width: 630 / 4,
    height: 414 / 4,
    cursor: "pointer",
    fontSize: 30,
    color: "#FFF",
    ":hover": {
      backgroundImage: `url("${hoverImage}")`
    }
  }
};

@radium
export default class Arrow extends React.Component {
  render() {
    return (
      <Block {...this.props} style={[style.base, this.props.style]}>
        <Center>{this.props.children}</Center>
      </Block>
    );
  }
}
