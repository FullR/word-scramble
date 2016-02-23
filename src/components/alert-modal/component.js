import React from "react";
import bembam from "bembam";
import Modal from "components/modal";
import Button from "components/button";

export default class AlertModal extends React.Component {
  render() {
    const {onClose, children, className} = this.props;
    const cn = bembam("Alert-modal", className);

    return (
      <Modal {...this.props} className={cn} onOverlayClick={onClose}>
        <div className={cn.el("text")}>{children}</div>
        <div className={cn.el("button-container")}>
          <Button onClick={onClose}>Okay</Button>
        </div>
      </Modal>
    );
  }
}
