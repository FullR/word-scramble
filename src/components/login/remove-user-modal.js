import React from "react";
import ConfirmModal from "components/confirm-modal";
import Button from "components/button";

const style = {
  username: {fontWeight: 600}
};

export default class RemoveUserModal extends React.Component {
  render() {
    const {user} = this.props;
    return (
      <ConfirmModal {...this.props}>
        Are you sure you want to remove <span style={style.username}>{user.name}</span>?<br/>This action cannot be undone.
      </ConfirmModal>
    );
  }
}
