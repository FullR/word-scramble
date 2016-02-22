import React from "react";
import cn from "util/cn";
import DragContainer from "components/drag-container";
import DropContainer from "components/drop-container";
import Frame from "components/frame";
import Letter from "components/letter";

export default class DndLetter extends React.Component {
  render() {
    const {value, onDrop, letter, className, size} = this.props;
    const classNames = cn("Dnd-letter", className);

    return (
      <Frame {...this.props} onDrop={null} value={null} letter={null} size={null}>
        <DropContainer onDrop={onDrop} className="Dnd-letter__drop">
          <DragContainer value={value} className="Dnd-letter__drag">
            <Letter letter={letter} size={size}/>
          </DragContainer>
        </DropContainer>
      </Frame>
    );
  }
}
