import React from "react";
import {chunk, noop} from "lodash";
import getPuzzleData from "util/get-puzzle-data";
import PuzzleList from "../puzzle-list";
import PuzzleListItem from "../puzzle-list-item";
import bembam from "bembam";

export default class Menu extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
    puzzles: React.PropTypes.array.isRequired,
    pageLength: React.PropTypes.number,
    onSelectPuzzle: React.PropTypes.func
  };

  static defaultProps = {
    pageLength: 10,
    onSelectPuzzle: noop
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 0
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

  render() {
    const {className, user, puzzles, pageLength, onSelectPuzzle} = this.props;
    const {page} = this.state;
    const cn = bembam("Menu", className);
    const puzzlePages = chunk(puzzles, pageLength);
    const puzzlePage = puzzlePages[page];
    const puzzleItemHeight = this.getPuzzleItemHeight();

    return (
      <div {...this.props} className={cn}>
        <div className={cn.el("puzzle-list-container")}>
          <PuzzleList className={cn.el("puzzle-list")}>
            {puzzlePage.map((puzzle, i) => {
              const {word} = getPuzzleData(puzzle.puzzleDataId);

              return (
                <PuzzleListItem
                  key={puzzle.id}
                  height={puzzleItemHeight}
                  onClick={onSelectPuzzle.bind(null, puzzle.id)}
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
      </div>
    );
  }
}
