import React from "react";
import radium from "radium";

const letterImages = {
  "a": require("../../images/letters/a.png"),
  "b": require("../../images/letters/b.png"),
  "c": require("../../images/letters/c.png"),
  "d": require("../../images/letters/d.png"),
  "e": require("../../images/letters/e.png"),
  "f": require("../../images/letters/f.png"),
  "g": require("../../images/letters/g.png"),
  "h": require("../../images/letters/h.png"),
  "i": require("../../images/letters/i.png"),
  "j": require("../../images/letters/j.png"),
  "k": require("../../images/letters/k.png"),
  "l": require("../../images/letters/l.png"),
  "m": require("../../images/letters/m.png"),
  "n": require("../../images/letters/n.png"),
  "o": require("../../images/letters/o.png"),
  "p": require("../../images/letters/p.png"),
  "q": require("../../images/letters/q.png"),
  "r": require("../../images/letters/r.png"),
  "s": require("../../images/letters/s.png"),
  "t": require("../../images/letters/t.png"),
  "u": require("../../images/letters/u.png"),
  "v": require("../../images/letters/v.png"),
  "w": require("../../images/letters/w.png"),
  "x": require("../../images/letters/x.png"),
  "y": require("../../images/letters/y.png"),
  "z": require("../../images/letters/z.png")
};

@radium
export default class Letter extends React.Component {
  static defaultProps = {
    width: 50,
    height: 60
  };
  render() {
    const {letter, width, height} = this.props;
    const style = {
      width, height,
      display: "inline-block",
      backgroundImage: `url("${letterImages[letter.toLowerCase()]}")`,
      backgroundSize: "100% 100%"
    };
    return (<div {...this.props} style={[style, this.props.style]}/>);
  }
}
