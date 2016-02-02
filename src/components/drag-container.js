import React from "react";
import {isFunction} from "lodash";
import radium from "radium";
import {DragSource} from "react-dnd";
import {getEmptyImage} from "react-dnd-html5-backend";

const source = {
  beginDrag(props) {
    return props;
  },

  endDrag(props, monitor, component) {
    const choice = monitor.getItem();

    if(monitor.didDrop() && isFunction(choice.onDrop)) {
      choice.onDrop(monitor.getDropResult().value);
    }
  },

  canDrag(props, monitor) {
    return !props.disabled;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview()
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

@DragSource("drag-container", source, collect)
@radium
export default class DragContainer extends React.Component {
  static defaultProps = {
    autohide: true
  };

  render() {
    const {connectDragSource, isDragging, hidden, autohide, children} = this.props;
    const dynamicStyle = {
      visibility: hidden || (autohide && isDragging) ? "hidden" : null
    };

    return connectDragSource(
      <div {...this.props} style={[style.base, dynamicStyle, this.props.style]}>
        <div style={style.content}>{children}</div>
      </div>
    );
  }
}
