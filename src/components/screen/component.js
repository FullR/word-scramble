import React from "react";
import bembam from "bembam";

export default class Screen extends React.Component {
  render() {
    const {className} = this.props;
    const cn = bembam("Screen", className);

    return (
      <div {...this.props} className={cn}/>
    );
  }
}
