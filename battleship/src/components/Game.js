import React, { Component } from "react";
import Gameboard from "../components/Gameboard";

class Game extends Component {
  state = {
    userName: "User",
    computerName: "Computer",
    isUserTurn: true,
    bothFleetsSet: false,
  };

  updateBothFleetsSet = () => {
    this.setState({ bothFleetsSet: true });
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
          isUserTurn={isUserTurn}
          isUserBoard={true}
          changeTurn={this.changeTurn}
          updateBothFleetsSet={this.updateBothFleetsSet}
        />
        <Gameboard
          who={computerName}
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
