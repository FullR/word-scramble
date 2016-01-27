import React from "react";
import Login from "components/login/index";
import Menu from "components/menu";

export default class Application extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

  setUser(user) {
    this.setState({user});
  }

  render() {
    const {user} = this.state;

    if(!user) {
      return (
        <Login onSubmit={this.setUser.bind(this)}/>
      );
    }

    return (
      <Menu user={user}/>
    );
  }
}
