import React from "react";
import Splash from "components/splash";
import Login from "components/login";
import Menu from "components/menu";
import Puzzle from "components/puzzle";
import store from "store";
import actions from "store/actions";
import storeListener from "decorators/store-listener";
import getPuzzleData from "util/get-puzzle-data";

@storeListener(store, (Wrapped, props, storeState) => <Wrapped store={storeState}/>)
export default class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingSplash: true,
      showingLogin: false,
      currentPuzzleId: null
    };
  }

  showPuzzle(puzzleId) {
    this.setState({currentPuzzleId: puzzleId});
  }

  closeSplash() {
    this.setState({
      showingSplash: false,
      showingLogin: true
    });
  }

  closeLogin() {
    const {currentUser} = this.props.store;
    if(currentUser) {
      this.setState({
        showingSplash: false,
        showingLogin: false
      });
    }
  }

  createUser(name) {
    store.dispatch({
      type: actions.CREATE_USER,
      name
    });
  }

  deleteUser(userId) {
    store.dispatch({
      type: actions.DELETE_USER,
      userId
    });
  }

  selectUser(userId) {
    store.dispatch({
      type: actions.SELECT_USER,
      userId
    });
  }

  render() {
    const {store} = this.props;
    const {users, currentUser, puzzles} = store;
    const {currentPuzzleId, showingSplash, showingLogin} = this.state;
    const currentPuzzle = currentPuzzleId ? puzzles.find((puzzle) => puzzle.id === currentPuzzleId) : null;

    switch(true) {
      case !!currentPuzzle: return (
        <Puzzle {...currentPuzzle} {...getPuzzleData(currentPuzzle.puzzleDataId)}
          puzzleId={currentPuzzle.id}
        />
      );
      case showingSplash: return (
        <Splash
          onComplete={this.closeSplash.bind(this)}
        />
      );
      case showingLogin: return (
        <Login
          users={users}
          currentUser={currentUser}
          onComplete={this.closeLogin.bind(this)}
          onCreateUser={this.createUser.bind(this)}
          onDeleteUser={this.deleteUser.bind(this)}
          onSelectUser={this.selectUser.bind(this)}
          onSubmit={this.closeLogin.bind(this)}
        />
      );
      default: return (
        <Menu
          user={users.find((user) => user.id === currentUser)}
          puzzles={puzzles.filter((puzzle) => puzzle.userId === currentUser)}
          onSelectPuzzle={this.showPuzzle.bind(this)}
        />
      );
    }
  }
}
