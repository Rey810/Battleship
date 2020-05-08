// this will be the board that controls the game state as well as the state of the user and the computer
// ploce ships at specific coordinates by calling the ship factory function
import React, { Component } from "react";
import GridCell from "../components/GridCell";
import uniqID from "../utils/util";

export default class Gameboard extends Component {
  state = {
    /* isPlayer or isComputer can be used to track whose board is being used
      a complete board state should probably be kept here
      a complete ship status state should probably be kept here */
  };

  // handleHover

  // handleClick
  // takes in click coordinates: a classname for the clicked block
  // and then it creates a ship of length (shipLength defined in the Ship component starting at selected coordinates

  render() {
    let gridCellsContainer = [];
    for (let i = 1; i <= 100; i++) {
      gridCellsContainer.push(<GridCell key={i} id={`P${i}`} />);
    }

    return <div className="gameboard grid-10x10">{gridCellsContainer}</div>;
  }
}
