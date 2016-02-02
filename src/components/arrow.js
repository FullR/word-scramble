import React from "react";
import radium from "radium";
import Block from "components/block";
import Center from "components/center";
import maintainRatios from "util/maintain-ratios";

const image = require("../../images/arrow.png");
const hoverImage = require("../../images/arrow_hover.png");
const imageSize = {width: 630, height: 414};
const style = {
  base: {
    backgroundImage: `url("${image}")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
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
    const {width, height} = this.props;
    const sizeStyle = maintainRatios(imageSize, {width, height});
    return (
      <Block {...this.props} style={[style.base, sizeStyle, this.props.style]}>
        <Center>{this.props.children}</Center>
      </Block>
    );
  }
}
