import React from "react";
import radium from "radium";

/*
  Replacement for basic div tags.
  Block normalizes absolute positioning by including a relatively positioned inner div.

  Normally, absolutely positioning an element in an absolutely positioned element (absolute(absolute)) doesn't work
  as expected, but with a relatively positioned element wrapping the inner absolute positioned element (absolute(relative(absolute))),
  absolute positioning works as expected.
*/

const style = {
  base: {
    display: "inline-block"
  },
  content: {
    position: "relative",
    width: "100%",
    height: "100%"
  },
  hidden: {
    visibility: "hidden"
  }
};

@radium
export default class Block extends React.Component {
  render() {
    const {hidden} = this.props;

    return (
      <div {...this.props} style={[style.base, hidden ? style.hidden : null, this.props.style]}>
        <div style={style.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
