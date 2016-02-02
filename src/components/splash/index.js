import React from "react";
import Arrow from "components/arrow";
import Center from "components/center";

const style = {
  base: {
    width: "100%",
    height: "100%",
    fontSize: 40
  },
  arrow: {
    position: "absolute",
    right: 100,
    bottom: 100
  }
};

export default class Splash extends React.Component {
  render() {
    const {onNext} = this.props;

    return (
      <div style={style.base}>
        <Center>
          Insert splashscreen image here
        </Center>
        <Arrow style={style.arrow} width={300} onClick={onNext}>
          Begin
        </Arrow>
      </div>
    );
  }
}
