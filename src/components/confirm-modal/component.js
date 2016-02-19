import React from "react";
import {noop} from "lodash";
import Modal from "../modal";
import Button from "../button";
import cn from "util/cn";

export default class ConfirmModal extends React.Component {
  static propTypes = {
    onConfirm: React.PropTypes.func,
    onCancel: React.PropTypes.func,
    confirmText: React.PropTypes.string,
    cancelText: React.PropTypes.string,
    confirmColor: React.PropTypes.string,
    cancelColor: React.PropTypes.string
  };

  static defaultProps = {
    onConfirm: noop,
    onCancel: noop,
    confirmText: "Confirm",
    cancelText: "Cancel",
    confirmColor: "green",
    cancelColor: "red"
  };

  render() {
    const {onConfirm, onCancel, confirmText, cancelText, confirmColor, cancelColor, children, className} = this.props;
    const classNames = cn("Confirm-modal", className);

    return (
      <Modal {...this.props} className={classNames} onOverlayClick={onCancel}>
        <div className="Confirm-modal__text">{children}</div>

        <Button className="Confirm-modal__confirm" onClick={onConfirm} color={confirmColor}>Confirm</Button>
        <Button className="Confirm-modal__cancel" onClick={onCancel} color={cancelColor}>Cancel</Button>
      </Modal>
    );
  }
}
