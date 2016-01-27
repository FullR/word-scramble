import React from "react";
import Center from "components/center";
import Block from "components/block";
import Modal from "components/modal";
import Medal from "components/medal";
import Button from "components/button";

const style = {
  header: {
    fontSize: 60,
    textAlign: "center",
    width: "100%"
  },
  homeButton: {
    zIndex: 2,
    position: "absolute",
    left: 0,
    bottom: 0
  },
  nextButton: {
    position: "absolute",
    right: 0,
    bottom: 0
  },
  buttonContainer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    textAlign: "center"
  },
  incorrectLabel: {
    fontSize: 30,
    textAlign: "center",
    width: 400
  },
  showAnswerButton: {
    display: "inline-block"
  }
};

export default class CheckAnswerModal extends React.Component {
  render() {
    const {correct, onNextClick, onMenuClick, onShowClick, onOverlayClick} = this.props;

    return (
      <Modal width={600} onOverlayClick={onOverlayClick}>
        <div style={style.header}>{correct ? "Correct!" : "Incorrect"}</div>

        <Center>
          {correct ?
            <Medal/> :
            <div style={style.incorrectLabel}>
              <span>Press the close button to continue trying.</span>
            </div>
          }
        </Center>

        <Block style={style.buttonContainer}>
          {correct ? null :
            <Button style={style.showAnswerButton} onClick={onShowClick}>Show Correct Answer</Button>
          }
          <Button style={style.homeButton} onClick={onMenuClick}>Menu</Button>
          <Button style={style.nextButton} onClick={onNextClick}>{correct ? "Next" : "Skip"}</Button>
        </Block>
      </Modal>
    );
  }
}
