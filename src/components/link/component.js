import React from "react";
import {noop} from "lodash";
import bembam from "bembam";

export default class Link extends React.Component {
  static propTypes = {
    href: React.PropTypes.string,
    onClick: React.PropTypes.func
  };

  static defaultProps = {
    href: "#",
    onClick: noop
  };

  onClick(event) {
    if(this.props.href === "#") {
      event.preventDefault();
    }
    this.props.onClick();
  }

  render() {
    const {className} = this.props;
    const cn = bembam("Link", className);

    return (
      <a {...this.props} onClick={this.onClick.bind(this)} className={cn}/>
    );
  }
}
