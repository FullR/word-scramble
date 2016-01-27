import React from "react";
import radium from "radium";
import DropContainer from "components/drop-container";
import DragContainer from "components/drag-container";
import BubbleBox from "components/bubble-box";
import Center from "components/center";
import Block from "components/block";
require("style/glow-animation.scss");

const style = {
  base: {
    boxSizing: "border-box",
    margin: "0 10px 0 10px",
    padding: 10,
    border: "2px solid #ddd",
    borderRadius: 8
  },
  filled: {
    border: "2px solid #444",
    cursor: "pointer",
    ":hover": {
      border: "2px solid #00D"
    }
  },
  box: {
    width: 100,
    height: 100,
    fontSize: 80
  },
  over: {
    border: "2px solid #00D"
  },
  highlighted: {
    animation: "glow 1s ease-in-out infinite alternate"
  }
};

@radium
export default class Choice extends React.Component {
  render() {
    const {value, index, onDrop, type, highlighted} = this.props;

    return (
      <DropContainer value={{type, index}} overStyle={style.over} style={[
        this.props.style,
        style.base,
        value ? style.filled : null,
        highlighted ? style.highlighted : null
      ]}>
        {value ?
          <DragContainer onDrop={onDrop}>
            <Block style={style.box}>
              <Center>
                {value}
              </Center>
            </Block>
          </DragContainer> :
          <Block style={style.box}/>
        }
      </DropContainer>
    );
  }
}
