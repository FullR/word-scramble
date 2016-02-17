import React from "react";
import Button from "components/button";
import Center from "components/center";

const style = {
  base: {
    textAlign: "center"
  },

  header: {
    position: "relative",
    top: -50,
    fontSize: 50
  },

  text: {
    marginTop: 50,
    fontSize: 30
  }
};

export default class EndGame extends React.Component {
  render() {
    const {onBack, allComplete} = this.props;

    return (
      <div style={style.base}>
        <Center>
          <h1 style={style.header}>Congratulations!</h1>
          <p style={style.text}>
            {allComplete ?
              <span>You've completed all of the puzzles.<br/>Return to the menu and clear your progress to play again.</span> :
              <span>You've finished the game, but there are still some unsolved puzzles.<br/>Return to the menu to finish the unsolved puzzles.</span>
            }
          </p>

          <Button onClick={onBack}>Menu</Button>
        </Center>
      </div>
    );
  }
}
