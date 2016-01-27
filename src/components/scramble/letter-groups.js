import React from "react";
import Belt from "components/belt";
import {DragDropContext} from "react-dnd";
import dndBackend from "dnd-backend";
import Choice from "./choice";

function swapAt(arrA, arrB, aIndex, bIndex) {
  const cloneA = arrA.slice();
  const cloneB = arrB.slice();
  const a = cloneA[aIndex];
  const b = cloneB[bIndex];
  cloneA[aIndex] = b;
  cloneB[bIndex] = a;
  return [cloneA, cloneB];
}

function swapIndexes(arr, a, b) {
  const clone = arr.slice();
  const temp = clone[a];
  clone[a] = clone[b];
  clone[b] = temp;
  return clone;
}

const style = {
  base: {width: "100%", height: "100%"},
  row: {
    width: "100%",
    textAlign: "center"
  }
};

@DragDropContext(dndBackend)
export default class LetterGroups extends React.Component {
  static defaultProps = {
    rowSpacing: 100
  };

  onChange(unselected, selected) {
    const {onChange} = this.props;
    if(onChange) {
      onChange({unselected, selected});
    }
  }

  unselectedToSelected(choice, {type, index}) {
    const {unselected, selected} = this.props;
    this.onChange(...swapAt(unselected, selected, unselected.indexOf(choice), index));
  }

  selectedToSelected(choice, {type, index}) {
    const {unselected, selected} = this.props;
    const sourceIndex = selected.indexOf(choice);

    if(sourceIndex === index) { // no movement
      return;
    } else if(selected[index].value !== null) {
      const targetIndex = unselected.findIndex((choice) => choice.value === null);
      let [newUnselected, newSelected] = swapAt(unselected, selected, targetIndex, index);
      newSelected = swapIndexes(newSelected, index, sourceIndex);
      this.onChange(newUnselected, newSelected);
    } else {
      this.onChange(unselected, swapIndexes(selected, selected.indexOf(choice), index));
    }
  }

  selectedToUnselected(choice, {type, index}) {
    const {unselected, selected} = this.props;
    this.onChange(...swapAt(unselected, selected, index, selected.indexOf(choice)));
  }

  unselectedToUnselected(choice, {type, index}) {
    const {unselected, selected} = this.props;
    const sourceIndex = unselected.indexOf(choice);
    if(sourceIndex !== index) {
      this.onChange(swapIndexes(unselected, index, sourceIndex), selected);
    }
  }

  onDrop(choice, event) {
    const {unselected, selected} = this.props;
    const {type} = event;
    const isSelected = selected.includes(choice);
    const isUnselected = !isSelected;

    switch(true) {
      case type === "selected" && isUnselected: // unselected -> selected
        this.unselectedToSelected(choice, event);
      break;
      case type === "selected" && isSelected: // selected -> selected
        this.selectedToSelected(choice, event);
      break;
      case type === "unselected" && isUnselected: // unselected -> unselected
        this.unselectedToUnselected(choice, event);
      break;
      case type === "unselected" && isSelected: // selected -> unselected
        this.selectedToUnselected(choice, event);
      break;
    }
  }

  render() {
    const {unselected, selected, unselectedHintIndex, selectedHintIndex, rowSpacing, children} = this.props;
    const bottomRowStyle = {marginTop: rowSpacing};

    return (
      <div style={style.base}>
        <div style={style.row}>
          {selected.map((choice, i) =>
            <Choice
              key={`selected-${i}`}
              type="selected"
              value={choice.value}
              highlighted={i === selectedHintIndex}
              index={i}
              onDrop={this.onDrop.bind(this, choice)}
            />
          )}
        </div>
        <div style={{...style.row, ...bottomRowStyle}}>
          {unselected.map((choice, i) =>
            <Choice
              key={`unselected-${i}`}
              type="unselected"
              value={choice.value}
              highlighted={i === unselectedHintIndex}
              index={i}
              onDrop={this.onDrop.bind(this, choice)}
            />
          )}
        </div>
        {children}
      </div>
    );
  }
}
