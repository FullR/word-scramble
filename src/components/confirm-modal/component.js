import React from "react";
import bembam from "bembam";
import {noop} from "lodash";
import Modal from "../modal";
import Button from "../button";

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
    const cn = bembam("Confirm-modal", className);

    return (
      <Modal {...this.props} className={cn} onOverlayClick={onCancel}>
        <div className={cn.el("text")}>{children}</div>

        <Button className={cn.el("confirm")} onClick={onConfirm} color={confirmColor}>Confirm</Button>
        <Button className={cn.el("cancel")} onClick={onCancel} color={cancelColor}>Cancel</Button>
      </Modal>
    );
  }
}
