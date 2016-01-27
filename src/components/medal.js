import React from "react";
import radium from "radium";
import Block from "components/block";

const style = {
  base: {
    width: 150,
    height: 150,
    backgroundSize: "100% 100%"
  },
  gold: {
    backgroundImage: `url(${require("../../images/medal-gold.png")})`
  },
  silver: {
    backgroundImage: `url(${require("../../images/medal-silver.png")})`
  },
  bronze: {
    backgroundImage: `url(${require("../../images/medal-bronze.png")})`
  }
};

@radium
export default class Medal extends React.Component {
  static defaultProps = {
    color: "gold"
  };

  render() {
    const {color} = this.props;
    return (
      <Block {...this.props} style={[
        style.base,
        style[color],
        this.props.style
      ]}/>
    );
  }
}
