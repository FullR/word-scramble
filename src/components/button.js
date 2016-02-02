import React from "react";
import radium from "radium";
import Color from "color";

const colorStyle = (colorValue) => {
  const activeColor = Color(colorValue).darken(0.2).hexString();
  return {
    background: Color(colorValue).hexString(),

    ":hover": {
      background: activeColor,
    },
    ":active": {
      background: activeColor
    }
  }
};

const style = {
  disabled: {
    background: "#999",
    cursor: "default",
    ":hover": {background: "#999"},
    ":active": {background: "#999"}
  },
  hidden: {
    visibility: "hidden"
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
  },
  red: colorStyle("#900"),
  green: colorStyle("#090"),
  blue: colorStyle("#009")
};

@radium
export default class Button extends React.Component {
  static defaultProps = {
    color: "red"
  };

  render() {
    const {disabled, hidden, color} = this.props;
    return (
      <button {...this.props}
        color={null}
        style={[
          this.props.style,
          style.base,
          style[color] || colorStyle(color),
          disabled ? style.disabled : null,
          hidden ? style.hidden : null
        ]}
      />
    );
  }
}
