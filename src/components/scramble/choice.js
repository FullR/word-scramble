import React from "react";
import radium from "radium";
import DropContainer from "components/drop-container";
import DragContainer from "components/drag-container";
import BubbleBox from "components/bubble-box";
import Center from "components/center";
import Block from "components/block";
import Letter from "components/letter";
require("style/glow-animation.scss");

const style = {
  base: {
    boxSizing: "border-box",
    margin: "0 10px 0 10px",
    padding: 3,
    border: "2px solid #ddd",
    borderRadius: 8,
    cursor: "pointer",
    background: "#FFF"
  },
  filled: {
    border: "2px solid #444",
    cursor: "pointer",
    ":hover": {
      border: "2px solid #00D"
    }
  },
  over: {
    border: "2px solid #00D"
  },
  highlighted: {
    animation: "glow 1s ease-in-out infinite alternate"
  },
  disabled: {
    background: "rgb(220, 220, 220)",
    border: "2px solid #888",
    cursor: "default",
    ":hover": {
      border: "2px solid #888"
    }
  }
};

@radium
export default class Choice extends React.Component {
  static defaultProps = {
    width: 100,
    height: 100
  };
  render() {
    const {value, index, onDrop, type, highlighted, disabled, width, height} = this.props;
    const boxStyle = {width, height, fontSize: Math.min(width, height) * 0.8};

    return (
      <DropContainer value={{type, index}} overStyle={style.over} style={[
        this.props.style,
        style.base,
        value ? style.filled : null,
        highlighted ? style.highlighted : null,
        disabled && value ? style.disabled : null
      ]}>
        {value ?
          <DragContainer onDrop={onDrop} disabled={disabled} value={value}>
            <Block style={boxStyle}>
              <Letter
                style={{position: "relative", top: 5}}
                letter={value}
                height={height}
                width={width}
              />
            </Block>
          </DragContainer> :
          <Block style={boxStyle}/>
        }
      </DropContainer>
    );
  }
}
