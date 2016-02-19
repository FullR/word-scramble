import React from "react";
import {noop} from "lodash";
import cn from "util/cn";

export default class Modal extends React.Component {
  static propTypes = {
    onOverlayClick: React.PropTypes.func
  };

  static defaultProps = {
    onOverlayClick: noop
  };

  render() {
    const {onOverlayClick, children, className} = this.props;
    const classNames = cn("Modal", className);

    return (
      <div {...this.props} className={classNames} onOverlayClick={null}>
        <div className="Modal__overlay" onClick={onOverlayClick}/>
        <div className="Modal__window">
          <div className="Modal__window-content">
            {children}
          </div>
        </div>
      </div>
    );
  }
}
