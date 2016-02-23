import React from "react";
import bembam from "bembam";

export default class Medal extends React.Component {
  static propTypes = {
    type: React.PropTypes.oneOf(["bronze", "silver", "gold"])
  };

  static defaultProps = {
    type: "bronze"
  };

  render() {
    const {type, className} = this.props;
    const classNames = bembam("Medal", className)
      .mod(type);

    return (
      <div {...this.props} className={classNames}/>
    );
  }
}
