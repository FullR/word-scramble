import React from "react";
import cn from "util/cn";

export default class Button extends React.Component {
  static propTypes = {
    color: React.PropTypes.string
  };

  static defaultProps = {
    color: "green"
  };

  render() {
    const {color, disabled, className} = this.props;
    const classNames = cn(
      "Button",
      `Button--color-${color}`,
      disabled ? `Button--disabled` : null,
      className
    );

    return (
      <button {...this.props} className={classNames}/>
    );
  }
}
