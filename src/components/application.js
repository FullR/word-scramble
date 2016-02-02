import React from "react";
import Login from "components/login/index";
import Menu from "components/menu";
import Splash from "components/splash";
import Store from "store";
import levels from "level-data";

export default class Application extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      userStore: null,
      showingSplash: true
    };
  }

  logout() {
    this.setState({
      user: null,
      userStore: null
    });
  }

  setUser(user) {
    this.setState({
      user,
      userStore: new Store(user.id)
    });
  }

  deleteUserStore(id) {
    Store.delete(id);
  }

  hideSplash() {
    this.setState({showingSplash: false});
  }

  render() {
    const {user, userStore, showingSplash} = this.state;

    if(showingSplash) {
      return (
        <Splash onNext={this.hideSplash.bind(this)}/>
      );
    }

    if(!user) {
      return (
        <Login onSubmit={this.setUser.bind(this)} onRemoveUser={this.deleteUserStore.bind(this)}/>
      );
    }

    return (
      <Menu
        key={`menu-${user.id}`}
        levels={levels}
        user={user}
        store={userStore}
        onLogout={this.logout.bind(this)}
      />
    );
  }
}
