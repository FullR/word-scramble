import React from "react";
import {DragLayer} from "react-dnd";
import Letter from "components/letter";

const style = {
  outline: "2px solid blue",
  position: "fixed",
  zIndex: 100,
  width: "100%",
  height: "100%",
  left: 0,
  top: 0
};

function getStyle({currentOffset}) {
  const {x, y} = currentOffset;
  return {
    transform: `translate(${x}px, ${y}px)`
  };
}

@DragLayer((monitor) => ({
  item: monitor.getItem(),
  isDragging: monitor.isDragging(),
  currentOffset: monitor.getSourceClientOffset()
}))
export default class CustomDragLayer extends React.Component {
  render() {
    const {item, isDragging, currentOffset} = this.props;
    if(!isDragging) return null;
    console.log(item.value, currentOffset);
    return (
      <div style={style}>
        <Letter letter={item.value} style={getStyle(this.props)}/>
      </div>
    );
  }
}
