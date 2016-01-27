import React from "react";
import radium from "radium";
import {DropTarget} from "react-dnd";

const target = {
  canDrop(props) {
    return !props.disabled;
  },

  drop(props, monitor) {
    return {value: props.value};
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

const style = {
  base: {
    display: "inline-block",
    verticalAlign: "middle"
  },
  content: {
    position: "relative",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%"
  }
};

@DropTarget("drag-container", target, collect)
@radium
export default class DropContainer extends React.Component {
  render() {
    const {letter, connectDropTarget, isOver, children, overStyle} = this.props;

    return connectDropTarget(
      <div {...this.props} style={[style.base, this.props.style, isOver ? overStyle : null]}>
        <div style={style.content}>{children}</div>
      </div>
    );
  }
}
