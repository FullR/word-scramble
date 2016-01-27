import React from "react";
import radium from "radium";

const style = {
  disabled: {
    background: "#999",
    cursor: "default",
    ":hover": {background: "#999"},
    ":active": {background: "#999"}
  },
  base: {
    width: 150,
    padding: 10,
    borderRadius: 10,
    background: "#900",
    fontSize: 18,
    color: "#FFF",
    outline: "0px solid #000",
    cursor: "pointer",
    verticalAlign: "top",
    ":hover": {background: "#600"},
    ":active": {background: "#600"}
  }
};

@radium
export default class HintButton extends React.Component {
  render() {
    const {disabled} = this.props;
    return (
      <button {...this.props}
        style={[
          this.props.style,
          style.base,
          disabled ? style.disabled : null
        ]}
      />
    );
  }
}
