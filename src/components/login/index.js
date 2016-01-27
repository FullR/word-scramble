import React from "react";
import Button from "components/button";
import Center from "components/center";
import UserListItem from "./user-list-item";
import saveState from "decorators/save-state";
import RemoveUserModal from "./remove-user-modal";
import AlertModal from "components/alert-modal";

const style = {
  base: {
    width: "100%",
    height: "100%",
    padding: 20
  },

  header: {
    width: "100%",
    textAlign: "center",
    fontSize: 25,
    fontWeight: 800,
    marginTop: 35
  },

  usersBox: {
    width: 600,
    overflowY: "auto",
    overflowX: "hidden"
  },

  formBox: {
    height: 50,
    paddingBottom: 20,
    width: "100%",
    overflow: "visible",
    whiteSpace: "nowrap"
  },

  input: {
    width: 427,
    height: 45,
    fontSize: 25,
    marginRight: 20
  },

  userList: {
    padding: 0,
    fontSize: 25,
    margin: 0,
    overflow: "auto",
    height: 600,
    border: "2px solid #DDD"
  },

  loginButton: {
    position: "absolute",
    bottom: 75,
    right: 75
  }
};

@saveState({namespace: "login", keys: ["users", "selectedUserId", "idCounter"]})
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.load({
      userNameText: "",
      users: [],
      selectedUserId: null,
      idCounter: 0,
      userIdToRemove: null,
      duplicateNameModal: null
    });
  }

  get currentUser() {
    return this.getUserById(this.state.selectedUserId);
  }

  componentDidMount() {
    this.refs.nameInput.focus();
  }

  getUserById(id) {
    return this.state.users.find((user) => user.id === id);
  }

  userExists(id) {
    return !!this.getUserById(id);
  }

  updateUserNameText(event) {
    this.setState({userNameText: event.target.value});
  }

  createUser(event) {
    event.preventDefault();
    const {userNameText, users, selectedUserId, idCounter} = this.state;
    const name = userNameText.trim();
    const id = `user-${idCounter}`;

    if(name.length) {
      const lowerName = name.toLowerCase()
      if(users.find((user) => user.name.toLowerCase() === lowerName)) {
        this.setState({
          duplicateNameModal: lowerName
        });
      } else {
        this.setState({
          userNameText: "",
          users: [{id, name}, ...users],
          selectedUserId: selectedUserId ? selectedUserId : id,
          idCounter: idCounter + 1
        });
      }
    }
  }

  selectUser(id) {
    this.setState({selectedUserId: id});
  }

  removeUser(id) {
    const {users, selectedUserId} = this.state;
    this.setState({
      users: users.filter((user) => user.id !== id),
      selectedUserId: selectedUserId === id ? null : selectedUserId,
      userIdToRemove: null
    });
  }

  login() {
    const {users, selectedUserId} = this.state;
    const {onLogin} = this.props;
    const {currentUser} = this;
    if(onLogin && currentUser) {
      onLogin(currentUser);
    }
  }

  closeRemoveUserModal() {
    this.setState({userIdToRemove: null});
  }

  confirmRemoveUser(id) {
    this.setState({userIdToRemove: id});
  }

  openDuplicateNameModal(name) {
    this.setState({duplicateNameModal: name});
  }

  closeDuplicateNameModal() {
    this.setState({duplicateNameModal: null});
  }

  renderModals() {
    const {userIdToRemove, duplicateNameModal} = this.state;

    if(userIdToRemove) {
      return (
        <RemoveUserModal
          user={this.getUserById(userIdToRemove)}
          onConfirm={this.removeUser.bind(this, userIdToRemove)}
          onCancel={this.closeRemoveUserModal.bind(this)}
        />
      );
    }
    if(duplicateNameModal) {
      return (
        <AlertModal onClose={this.closeDuplicateNameModal.bind(this)} height={200}>
          A user with the name "{duplicateNameModal}" already exists.
        </AlertModal>
      );
    }
  }

  render() {
    const {userNameText, users, selectedUserId} = this.state;

    return (
      <div style={style.base}>
        <div style={style.header}>Create or Select a user</div>
        <Center style={style.usersBox}>
          <div style={style.formBox}>
            <form onSubmit={this.createUser.bind(this)}>
              <input
                ref="nameInput"
                style={style.input}
                value={userNameText}
                onChange={this.updateUserNameText.bind(this)}
                placeholder="Name"
              />
              <Button>Create</Button>
            </form>
          </div>
          <ul style={style.userList}>
            {users.map(({id, name}) =>
              <UserListItem
                key={id}
                selected={id === selectedUserId}
                onClick={this.selectUser.bind(this, id)}
                onRemoveClick={this.confirmRemoveUser.bind(this, id)}
              >
                {name}
              </UserListItem>
            )}
          </ul>
        </Center>

        <Button onClick={this.login.bind(this)} style={style.loginButton} disabled={!selectedUserId} color="green">Login</Button>
        {this.renderModals()}
      </div>
    );
  }
}
