import React, { Component } from "react";
import Gameboard from "../components/Gameboard";

class Game extends Component {
  state = {
    userName: "User",
    computerName: "A Really Smart AI",
    isUserTurn: true,
    bothFleetsSet: false,
    // mayvbe have a game reset state here
  };

  updateBothFleetsSet = () => {
    this.setState({ bothFleetsSet: true });
  };

  resetGame = () => {
    this.setState({ resetGame: true });
  };

  changeTurn = () => {
    this.setState({ isUserTurn: !this.state.isUserTurn });
    console.log("changed turn");
  };

  render() {
    const { userName, computerName, isUserTurn, bothFleetsSet } = {
      ...this.state,
    };
    return (
      <>
        <Gameboard
          who={userName}
          opponent={computerName}
          isUserTurn={isUserTurn}
          isUserBoard={true}
          changeTurn={this.changeTurn}
          updateBothFleetsSet={this.updateBothFleetsSet}
        />
        <Gameboard
          who={computerName}
          opponent={userName}
          isUserTurn={isUserTurn}
          isUserBoard={false}
          changeTurn={this.changeTurn}
          bothFleetsSet={bothFleetsSet}
        />
      </>
    );
  }
}

export default Game;
