import React from "react";
import radium from "radium";
import {DragDropContext} from "react-dnd";
import dndBackend from "dnd-backend";
import Block from "components/block";
import Belt from "components/belt";
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

const rowStyle = {
  position: "absolute",
  width: "100%",
  textAlign: "center"
};
const style = {
  base: {
    width: "100%",
    boxSizing: "border-box"
  },
  top: {
    ...rowStyle,
    top: 20
  },
  bottom: {
    ...rowStyle,
    bottom: 20
  }
};

@DragDropContext(dndBackend)
@radium
export default class LetterGroups extends React.Component {
  static defaultProps = {
    rowSpacing: 100
  };

  getChoiceSize() {
    const {unselected} = this.props;
    if(unselected.length >= 12) {
      return {width: 75, height: 90};
    } else {
      return {width: 100, height: 120};
    }
  }

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
    const {unselected, selected, unselectedHintIndex, selectedHintIndex, rowSpacing, disabled, children} = this.props;
    const {width, height} = this.getChoiceSize();
    const dynamicStyle = {
      height: this.props.height
    };

    return (
      <Block style={[style.base, dynamicStyle]}>
        <div style={style.top}>
          {selected.map((choice, i) =>
            <Choice
              key={`selected-${i}`}
              type="selected"
              value={choice.value}
              highlighted={i === selectedHintIndex}
              index={i}
              onDrop={this.onDrop.bind(this, choice)}
              disabled={disabled}
              width={width}
              height={height}
            />
          )}
        </div>
        <div style={style.bottom}>
          {unselected.map((choice, i) =>
            <Choice
              key={`unselected-${i}`}
              type="unselected"
              value={choice.value}
              highlighted={i === unselectedHintIndex}
              index={i}
              onDrop={this.onDrop.bind(this, choice)}
              disabled={disabled}
              width={width}
              height={height}
            />
          )}
        </div>
        {children}
      </Block>
    );
  }
}
