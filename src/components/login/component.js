import React from "react";
import bembam from "bembam";
import Screen from "../screen";
import Button from "../button";
import UserList from "../user-list";
import UserListItem from "../user-list-item";
import UserListForm from "../user-list-form";
import ConfirmModal from "../confirm-modal";
import AlertModal from "../alert-modal";


export default class Login extends React.Component {
  static propTypes = {
    users: React.PropTypes.array,
    onCreateUser: React.PropTypes.func,
    onDeleteUser: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
    currentUser: React.PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      userToDelete: null,
      duplicateUserNameModal: false
    };
  }

  hideDuplicateUserNameModal() {
    this.setState({duplicateUserNameModal: false});
  }

  showDeleteModal(userToDelete) {
    this.setState({userToDelete});
  }

  hideDeleteModal() {
    this.setState({userToDelete: null});
  }

  updateUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  selectUser(id) {
    const {onSelectUser} = this.props;
    if(onSelectUser) {
      onSelectUser(id);
    }
  }

  deleteUser(id) {
    const {onDeleteUser} = this.props;
    if(onDeleteUser) {
      onDeleteUser(id);
      this.hideDeleteModal();
    }
  }

  createUser() {
    const {onCreateUser, users} = this.props;
    const username = this.state.username.trim();

    if(users.some((user) => user.name === username)) {
      this.setState({
        username: "",
        duplicateUserNameModal: true
      });
    } else if(onCreateUser) {
      onCreateUser(this.state.username);
      this.setState({
        username: ""
      });
    }
  }

  renderModals() {
    const {userToDelete, duplicateUserNameModal} = this.state;

    if(userToDelete) {
      return (
        <ConfirmModal
          onConfirm={this.deleteUser.bind(this, userToDelete.id)}
          onCancel={this.hideDeleteModal.bind(this)}
        >
          Are you sure you want to delete the user <strong>{userToDelete.name}</strong>?<br/>
          This action cannot be undone.
        </ConfirmModal>
      );
    } else if(duplicateUserNameModal) {
      return (
        <AlertModal onClose={this.hideDuplicateUserNameModal.bind(this)}>
          A user with that name already exists.
        </AlertModal>
      );
    }
  }

  render() {
    const {users, currentUser, onSubmit, className} = this.props;
    const {selectedUserId, username} = this.state;
    const cn = bembam("Login", className);

    return (
      <Screen {...this.props} className={cn} onSubmit={null}>
        <div className={cn.el("header")}>
          <div className={cn.el("header-text")}>Create or Select a user</div>
        </div>
        <div className={cn.el("form-container")}>
          <UserListForm
            value={username}
            onChange={this.updateUsername.bind(this)}
            onSubmit={this.createUser.bind(this)}
          />
        </div>
        <div className={cn.el("user-list")}>
          <UserList>
            {users.map((user) =>
              <UserListItem
                key={user.id}
                selected={user.id === currentUser}
                onClick={this.selectUser.bind(this, user.id)}
                onRemoveClick={this.showDeleteModal.bind(this, user)}
              >
                {user.name}
              </UserListItem>
            )}
          </UserList>
        </div>
        <div className={cn.el("footer")}>
          <Button className={cn.el("login-button")} onClick={onSubmit} disabled={!currentUser}>Login</Button>
        </div>
        {this.renderModals()}
      </Screen>
    );
  }
}
