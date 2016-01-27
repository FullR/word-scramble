import React from "react";
import Modal from "components/modal";
import Button from "components/button";

const style = {
  text: {
    fontSize: 25,
    width: "100%",
    textAlign: "center"
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    textAlign: "center"
  }
};

export default class AlertModal extends React.Component {
  static defaultProps = {
    buttonText: "Close"
  };

  render() {
    const {onClose, buttonText, children} = this.props;
    return (
      <Modal onOverlayClick={onClose} height={250} {...this.props}>
        <div style={style.text}>{children}</div>
        <div style={style.buttonContainer}>
          <Button onClick={onClose}>{buttonText}</Button>
        </div>
      </Modal>
    );
  }
}
