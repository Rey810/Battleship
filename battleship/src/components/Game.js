import React, { Component } from "react";
import Scoreboard from "../components/Scoreboard";
import Gameboard from "../components/Gameboard";

class Game extends Component {
  state = {
    userName: "User",
    computerName: "A Really Smart AI",
    isUserTurn: true,
    bothFleetsSet: false,
    userKey: 1,
    computerKey: 100,
    user: 0,
    computer: 0,
  };

  //Because this.props and this.state may be updated asynchronously, you should not rely on their values for calculating the next state.
  //To fix it, use a second form of setState() that accepts a function rather than an object. That function will receive the previous state as the first argument, and the props at the time the update is applied as the second argument:
  updateScore = (player) => {
    this.setState((state) => ({ [player]: state[player] + 1 }));
  };

  updateBothFleetsSet = () => {
    this.setState({ bothFleetsSet: true });
  };

  resetGame = () => {
    // this.setState({ resetGame: !this.state.resetGame, isUserTurn: true });
    this.setState({
      bothFleetsSet: false,
      userKey: this.state.userKey + 1,
      computerKey: this.state.computerKey + 1,
    });
  };

  changeTurn = () => {
    this.setState({ isUserTurn: !this.state.isUserTurn });
    console.log("changed turn");
  };

  render() {
    const {
      userName,
      computerName,
      isUserTurn,
      bothFleetsSet,
      userKey,
      computerKey,
    } = {
      ...this.state,
    };
    return (
      <>
        <div class="center-text">
          <div className="column header">
            <h1 className="no-margin-bottom">Battleship</h1>
            <Scoreboard
              userName={this.state.userName}
              userScore={this.state.user}
              computerScore={this.state.computer}
            />
          </div>
          <Gameboard
            key={userKey}
            who={userName}
            opponent={computerName}
            isUserTurn={isUserTurn}
            isUserBoard={true}
            changeTurn={this.changeTurn}
            updateBothFleetsSet={this.updateBothFleetsSet}
            resetGameAction={this.resetGame}
            updateScoreAction={this.updateScore}
          />
          <Gameboard
            key={computerKey}
            who={computerName}
            opponent={userName}
            isUserTurn={isUserTurn}
            isUserBoard={false}
            changeTurn={this.changeTurn}
            bothFleetsSet={bothFleetsSet}
            resetGameAction={this.resetGame}
            updateScoreAction={this.updateScore}
          />
        </div>
      </>
    );
  }
}

export default Game;
