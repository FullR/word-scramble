import React from "react";
import bembam from "bembam";
import DragContainer from "components/drag-container";
import DropContainer from "components/drop-container";
import Frame from "components/frame";
import Letter from "components/letter";

export default class DndLetter extends React.Component {
  render() {
    const {value, onDrop, letter, className, size} = this.props;
    const cn = bembam("Dnd-letter", className);

    return (
      <Frame {...this.props} className={cn} onDrop={null} value={null} letter={null} size={null}>
        <DropContainer onDrop={onDrop} className={cn.el("drop")}>
          <DragContainer value={value} className={cn.el("drag")}>
            <Letter letter={letter} size={size}/>
          </DragContainer>
        </DropContainer>
      </Frame>
    );
  }
}
