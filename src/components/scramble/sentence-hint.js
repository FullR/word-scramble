import React from "react";
import Block from "components/block";
import Center from "components/center";

const style = {
  base: {
    padding: 20,
    fontSize: 22,
    background: "rgba(255, 255, 255, 0.8)",
    borderRadius: 8
  }
};

export default class SentenceHint extends React.Component {
  render() {
    return (
      <Block {...this.props} style={style.base}/>
    );
  }
}
