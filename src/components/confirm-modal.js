import React from "react";
import Modal from "components/modal";
import Button from "components/button";

const style = {
  text: {
    fontSize: 25,
    width: "100%",
    textAlign: "center"
  },
  cancelButton: {
    position: "absolute",
    left: 0,
    bottom: 0
  },
  confirmButton: {
    position: "absolute",
    right: 0,
    bottom: 0
  }
};

export default class ConfirmModal extends React.Component {
  render() {
    const {onConfirm, onCancel, children} = this.props;
    return (
      <Modal onOverlayClick={onCancel} height={250} {...this.props}>
        <div style={style.text}>{children}</div>
        <Button style={style.cancelButton} onClick={onCancel}>Cancel</Button>
        <Button style={style.confirmButton} onClick={onConfirm}>Confirm</Button>
      </Modal>
    );
  }
}
