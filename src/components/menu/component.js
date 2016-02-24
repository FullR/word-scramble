import React from "react";
import {chunk, noop} from "lodash";
import bembam from "bembam";
import Screen from "components/screen";
import Button from "components/button";
import getPuzzleData from "util/get-puzzle-data";
import PuzzleList from "../puzzle-list";
import PuzzleListItem from "../puzzle-list-item";
import store from "store";
import actions from "store/actions";
import ConfirmModal from "components/confirm-modal";

export default class Menu extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
    puzzles: React.PropTypes.array.isRequired,
    pageLength: React.PropTypes.number,
    onSelectPuzzle: React.PropTypes.func,
    onChangeUser: React.PropTypes.func
  };

  static defaultProps = {
    pageLength: 10,
    onSelectPuzzle: noop,
    onChangeUser: noop
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      showingClearDataModal: false
    };
  }

  getPuzzleItemHeight() {
    return `${(100 / this.props.pageLength) * 2}%`;
  }

  getPageCount() {
    return Math.floor(this.props.puzzles.length / this.props.pageLength);
  }

  nextPage() {
    const page = Math.min(this.state.page + 1, this.getPageCount() - 1);
    if(page !== this.state.page) {
      this.setState({page});
    }
  }

  prevPage() {
    const page = Math.max(this.state.page - 1, 0);
    if(page !== this.state.page) {
      this.setState({page});
    }
  }

  clearUserData() {
    store.dispatch({type: actions.CLEAR_USER_DATA, userId: this.props.user.id});
  }

  showClearDataModal() {
    this.setState({showingClearDataModal: true});
  }

  hideClearDataModal() {
    this.setState({showingClearDataModal: false});
  }

  renderModals() {
    const {showingClearDataModal} = this.state;
    if(showingClearDataModal) {
      const onConfirm = () => (this.clearUserData(), this.hideClearDataModal());
      return (
        <ConfirmModal onConfirm={onConfirm} onCancel={this.hideClearDataModal.bind(this)}>
          Are you sure you want to reset your progress?<br/>This action cannot be undone.
        </ConfirmModal>
      );
    }
  }

  render() {
    const {className, user, puzzles, pageLength, onSelectPuzzle, onChangeUser} = this.props;
    const {page} = this.state;
    const cn = bembam("Menu", className);
    const puzzlePages = chunk(puzzles, pageLength);
    const puzzlePage = puzzlePages[page];
    const puzzleItemHeight = this.getPuzzleItemHeight();

    return (
      <Screen {...this.props} className={cn}>
        <div className={cn.el("puzzle-list-container")}>
          <PuzzleList className={cn.el("puzzle-list")}>
            {puzzlePage.map((puzzle, i) => {
              const {word} = getPuzzleData(puzzle.puzzleDataId);

              return (
                <PuzzleListItem
                  key={puzzle.id}
                  height={puzzleItemHeight}
                  onClick={puzzle.complete ? null : onSelectPuzzle.bind(null, puzzle.id)}
                >
                  {1 + i + (page * pageLength)}. {word}
                </PuzzleListItem>
              );
            })}
          </PuzzleList>
          <button onClick={this.prevPage.bind(this)}>{"<"}</button>
          {`${page+1}/${this.getPageCount()}`}
          <button onClick={this.nextPage.bind(this)}>{">"}</button>
        </div>

        <Button onClick={onChangeUser}>Change User</Button>
        <Button onClick={this.showClearDataModal.bind(this)}>Reset Progress</Button>
        {this.renderModals()}
      </Screen>
    );
  }
}
