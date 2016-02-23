import React from "react";
import bembam from "bembam";

export default class Button extends React.Component {
  static propTypes = {
    color: React.PropTypes.string
  };

  static defaultProps = {
    color: "green"
  };

  render() {
    const {color, disabled, className} = this.props;
    const cn = bembam("Button", className)
      .mod(`color-${color}`)
      .mod("disabled", disabled);

    return (
      <button {...this.props} className={cn}/>
    );
  }
}
