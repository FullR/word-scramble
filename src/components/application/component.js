import React from "react";
import Router from "components/router";
import Splash from "components/splash";
import Login from "components/login";
import Menu from "components/menu";
import Puzzle from "components/puzzle";
import EndGame from "components/end-game";
import store from "store";
import actions from "store/actions";
import storeListener from "decorators/store-listener";
import getPuzzleData from "util/get-puzzle-data";

@storeListener(store, (Wrapped, props, storeState) => <Wrapped store={storeState}/>)
export default class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: {
        name: "splash"
      }
    };
  }

  setRoute(name, options) {
    this.setState({route: {name, options}});
  }

  showPuzzle(puzzleId) {
    this.setRoute("puzzle", {puzzleId});
  }

  showLogin() {
    this.setRoute("login");
  }

  showMenu() {
    this.setRoute("menu");
  }

  showEndGame() {
    this.setRoute("endGame");
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

  nextPuzzle() {
    const currentPuzzleId = this.state.route.options.puzzleId;
    const {store} = this.props;
    const {currentUser, puzzles} = store;
    const userPuzzles = puzzles.filter((puzzle) => puzzle.userId === currentUser);
    const currentPuzzleIndex = userPuzzles.findIndex((puzzle) => puzzle.id === currentPuzzleId);

    for(let i = currentPuzzleIndex + 1, length = userPuzzles.length; i < length; i++) {
      if(!userPuzzles[i].complete) {
        this.showPuzzle(userPuzzles[i].id);
        return;
      }
    }

    this.showEndGame();
  }

  render() {
    const {route} = this.state;
    const {store} = this.props;
    const {users, currentUser, puzzles} = store;

    const routes = {
      splash: () => (
        <Splash
          onComplete={this.showLogin.bind(this)}
        />
      ),

      login: () => (
        <Login
          users={users}
          currentUser={currentUser}
          onCreateUser={this.createUser.bind(this)}
          onDeleteUser={this.deleteUser.bind(this)}
          onSelectUser={this.selectUser.bind(this)}
          onSubmit={this.showMenu.bind(this)}
        />
      ),

      menu: () => (
        <Menu
          user={users.find((user) => user.id === currentUser)}
          puzzles={puzzles.filter((puzzle) => puzzle.userId === currentUser)}
          onSelectPuzzle={this.showPuzzle.bind(this)}
          onChangeUser={this.showLogin.bind(this)}
        />
      ),

      puzzle: ({puzzleId}) => {
        const puzzle = puzzles.find((puzzle) => puzzle.id === puzzleId);
        return (
          <Puzzle {...puzzle} {...getPuzzleData(puzzle.puzzleDataId)}
            key={puzzle.id}
            puzzleId={puzzle.id}
            onBack={this.showMenu.bind(this)}
            onNext={this.nextPuzzle.bind(this)}
          />
        );
      },

      endGame: () => (
        <EndGame
          puzzles={puzzles.filter((puzzle) => puzzle.userId === currentUser)}
          onBack={this.showMenu.bind(this)}
        />
      )
    };

    return (<Router routes={routes} route={route}/>);
  }
}
