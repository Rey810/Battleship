import React, { Component } from "react";
import Gameboard from "../components/Gameboard";

class Game extends Component {
  state = {
    userName: "User",
    computerName: "A Really Smart AI",
    isUserTurn: true,
    bothFleetsSet: false,
    // resetGame: false,
    userKey: 1,
    computerKey: 100,
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
        <Gameboard
          key={userKey}
          who={userName}
          opponent={computerName}
          isUserTurn={isUserTurn}
          isUserBoard={true}
          changeTurn={this.changeTurn}
          updateBothFleetsSet={this.updateBothFleetsSet}
          // resetGameStatus={this.state.resetGame}
          resetGameAction={this.resetGame}
        />
        <Gameboard
          key={computerKey}
          who={computerName}
          opponent={userName}
          isUserTurn={isUserTurn}
          isUserBoard={false}
          changeTurn={this.changeTurn}
          bothFleetsSet={bothFleetsSet}
          // resetGameStatus={this.state.resetGame}
          resetGameAction={this.resetGame}
        />
      </>
    );
  }
}

export default Game;
