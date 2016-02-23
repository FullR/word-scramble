import React from "react";
import bembam from "bembam";
import Screen from "../screen";
import Button from "../button";

export default class Splash extends React.Component {
  static propTypes = {
    onComplete: React.PropTypes.func
  };

  render() {
    const {onComplete, className} = this.props;
    const cn = bembam("Splash", className);

    return (
      <Screen {...this.props} className={cn}>
        Insert splashscreen image here

        <Button onClick={onComplete}>Begin</Button>
      </Screen>
    );
  }
}
