import React from "react";
import UserListItem from "./user-list-item";

const style = {
  base: {
    padding: 0,
    fontSize: 25,
    margin: 0,
    overflow: "auto",
    height: 600,
    border: "2px solid #DDD"
  }
};

export default class UserList extends React.Component {
  onRemoveUser(id) {
    const {onRemoveUser} = this.props;
    if(onRemoveUser) {
      onRemoveUser(id);
    }
  }

  onSelectUser(id) {
    const {onSelectUser} = this.props;
    if(onSelectUser) {
      onSelectUser(id);
    }
  }

  render() {
    const {users, selectedId, onRemoveUser, onSelectUser} = this.props;
    return (
      <ul style={style.base}>
        {users.map(({id, name}) =>
          <UserListItem
            key={id}
            selected={id === selectedId}
            onClick={this.onSelectUser.bind(this, id)}
            onRemoveClick={this.onRemoveUser.bind(this, id)}
          >
            {name}
          </UserListItem>
        )}
      </ul>
    );
  }
}
