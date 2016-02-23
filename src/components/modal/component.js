import React from "react";
import bembam from "bembam";
import {noop} from "lodash";

export default class Modal extends React.Component {
  static propTypes = {
    onOverlayClick: React.PropTypes.func
  };

  static defaultProps = {
    onOverlayClick: noop
  };

  render() {
    const {onOverlayClick, children, className} = this.props;
    const cn = bembam("Modal", className);

    return (
      <div {...this.props} className={cn} onOverlayClick={null}>
        <div className={cn.el("overlay")} onClick={onOverlayClick}/>
        <div className={cn.el("window")}>
          <div className={cn.el("window-content")}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
