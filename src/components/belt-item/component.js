import React from "react";
import bembam from "bembam";

export default class BeltItem extends React.Component {
  render() {
    const {className} = this.props;
    const cn = bembam("Belt-item", className);

    return (
      <div {...this.props} className={cn}/>
    );
  }
}
