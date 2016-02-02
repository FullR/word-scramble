import React from "react";
import radium from "radium";
import Block from "components/block";
import maintainRatios from "util/maintain-ratios";

const imageSize = {width: 150, height: 150};
const style = {
  base: {
    backgroundSize: "100% 100%"
  },
  content: {
    position: "absolute",
    bottom: -20,
    fontSize: 18,
    color: "#444",
    textAlign: "center",
    width: "100%"
  },
  colors: {
    gold: {
      backgroundImage: `url(${require("../../images/medal-gold.png")})`
    },
    silver: {
      backgroundImage: `url(${require("../../images/medal-silver.png")})`
    },
    bronze: {
      backgroundImage: `url(${require("../../images/medal-bronze.png")})`
    }
  }
};

@radium
export default class Medal extends React.Component {
  static defaultProps = {
    color: "gold"
  };

  render() {
    const {width, height, children} = this.props;
    const {color} = this.props;
    const sizeStyle = maintainRatios(imageSize, {width, height});

    return (
      <Block {...this.props} style={[
        style.base,
        style.colors[color],
        sizeStyle,
        this.props.style
      ]}>
        <div style={style.content}>{children}</div>
      </Block>
    );
  }
}
