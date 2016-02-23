import React from "react";
import bembam from "bembam";

export default class Belt extends React.Component {
  render() {
    const {className} = this.props;
    const cn = bembam("Belt", className);

    return (
      <div {...this.props} className={cn}/>
    );
  }
}
