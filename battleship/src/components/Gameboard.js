// this will be the board that controls the game state as well as the state of the user and the computer
// ploce ships at specific coordinates by calling the ship factory function
import React, { Component } from "react";
import GridCell from "../components/GridCell";

export default class Gameboard extends Component {
  state = {};

  // handleClick
  // takes in click coordinates: a classname for the clicked block
  // and then it creates a ship of length (shipLength defined in the Ship component starting at selected coordinates

  // generate a grid of 10x10
  // generateGrid() {
  //   for (let i = 1; i <= 100; i++) {
  //     <
  //   }
  // }

  render() {
    let gridCellsContainer = [];
    for (let i = 1; i <= 100; i++) {
      gridCellsContainer.push(<GridCell id={`P${i}`} />);
    }

    return <div className="gameboard">{gridCellsContainer}</div>;
  }
}
