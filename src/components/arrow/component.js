import React from "react";
import cn from "util/cn";

export default class Arrow extends React.Component {
  static propTypes = {
    color: React.PropTypes.oneOf(["green", "red", "blue", "black"]),
    flipped: React.PropTypes.bool
  };

  static defaultProps = {
    color: "green",
    flipped: false
  };

  render() {
    const {color, flipped, className} = this.props;
    const classNames = cn(
      "Arrow",
      `Arrow--color-${color}`,
      flipped ? `Arrow--flipped` : null,
      className
    );

    return (
      <div {...this.props} className={classNames}>
        <div className="Arrow__content">
          <div className="Arrow__image"/>
          <div className="Arrow__text">{this.props.children}</div>
        </div>
      </div>
    );
  }
}
