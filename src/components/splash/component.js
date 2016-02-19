import React from "react";
import Screen from "../screen";
import Button from "../button";
import cn from "util/cn";

export default class Splash extends React.Component {
  static propTypes = {
    onComplete: React.PropTypes.func
  };

  render() {
    const {onComplete, className} = this.props;
    const classNames = cn("Splash", className);

    return (
      <Screen {...this.props} className={classNames}>
        Insert splashscreen image here

        <Button onClick={onComplete}>Begin</Button>
      </Screen>
    );
  }
}
