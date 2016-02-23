import React from "react";
import {noop} from "lodash";
import bembam from "bembam";
import Modal from "components/modal";
import Medal from "components/medal";
import Button from "components/button";

export default class ShowAnswerModal extends React.Component {
  static propTypes = {
    correct: React.PropTypes.bool,
    onClose: React.PropTypes.func,
    onSkip: React.PropTypes.func,
    onShowCorrect: React.PropTypes.func,
    medalType: React.PropTypes.string
  };

  static defaultProps = {
    correct: false,
    onClose: noop,
    onSkip: noop,
    onShowCorrect: noop
  };

  render() {
    const {correct, onClose, onSkip, onShowCorrect, medalType, className} = this.props;
    const cn = bembam("Show-answer-modal", className);

    return (
      <Modal {...this.props} className={cn} onOverlayClick={correct ? onClose : null}>
        <div className={cn.el("header")}>{correct ? "Correct!": "Incorrect"}</div>
        {correct ?
          <Medal type={medalType} className={cn.el("medal")}/> :
          <div className={cn.el("message")}>Press the close button to continue trying.</div>
        }

        {correct ?
          <div className={cn.el("buttons")}>
            <Button onClick={onSkip}>Skip</Button>
            <Button onClick={onClose}>Close</Button>
            <Button onClick={onShowCorrect}>Show Answer</Button>
          </div> :
          <Button onClick={onSkip} className={cn.el("next-button")}>Next</Button>
        }

      </Modal>
    );
  }
}
