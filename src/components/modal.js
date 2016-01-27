import React from "react";
import Block from "components/block";
import Center from "components/center";

const style = {
  base: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0
  },
  window: {
    background: "#FFF",
    padding: 20,
    boxShadow: "5px 5px 5px 8px rgba(0, 0, 0, 0.2)"
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.6)"
  }
};

export default class Modal extends React.Component {
  static defaultProps = {
    width: 400,
    height: 400
  };
  render() {
    const {width, height, onOverlayClick, children} = this.props;
    const propStyle = this.props.style;
    const dynamicWindowStyle = {width, height};
    return (
      <Block style={[style.base]}>
        <div style={style.overlay} onClick={onOverlayClick}/>
        <Center>
          <Block style={Object.assign({}, style.window, dynamicWindowStyle)}>
            {children}
          </Block>
        </Center>
      </Block>
    );
  }
}
