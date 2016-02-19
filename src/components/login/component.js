import React from "react";
import Screen from "../screen";
import Button from "../button";
import UserList from "../user-list";
import UserListItem from "../user-list-item";
import UserListForm from "../user-list-form";
import ConfirmModal from "../confirm-modal";
import cn from "util/cn";


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
      userToDelete: null
    };
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
    const {onCreateUser} = this.props;

    if(onCreateUser) {
      onCreateUser(this.state.username);
      this.setState({
        username: ""
      });
    }
  }

  renderModals() {
    const {userToDelete} = this.state;

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
    }
  }

  render() {
    const {users, currentUser, onSubmit, className} = this.props;
    const {selectedUserId, username} = this.state;
    const classNames = cn("Login", className);

    return (
      <Screen {...this.props} className={classNames} onSubmit={null}>
        <div className="Login__header">Create or Select a user</div>
        <div className="Login__user-list">
          <UserListForm
            value={username}
            onChange={this.updateUsername.bind(this)}
            onSubmit={this.createUser.bind(this)}
          />
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
        <Button className="Login__login-button" onClick={onSubmit} disabled={!currentUser}>Login</Button>
        {this.renderModals()}
      </Screen>
    );
  }
}