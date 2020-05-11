// this will be the board that controls the game state as well as the state of the user and the computer
// ploce ships at specific coordinates by calling the ship factory function
import React, { Component } from "react";
import shipFactory from "../factories/shipFactory";
import GridCell from "../components/GridCell";

export default class Gameboard extends Component {
  state = {
    /* isPlayer or isComputer can be used to track whose board is being used
      a complete board state is kept here
      a complete ship status state is kept here 
      the shipFactory function is used to populate the ship data for the user and the computer
      */
    isUserTurn: true,
    isComputerTurn: false,
    isGameOver: false,
    user: {
      isPlacedAllShips: false,
      ships: {
        // each shipFactory returns the following:
        // 1. isPlaced: Boolean
        // 2. gridPosition: Array
        // 3. isSunk: function
        // 4. length: Number
        // 5. Type: String
        carrier: shipFactory("carrier"),
        cruiser: shipFactory("cruiser"),
        destroyer: shipFactory("destroyer"),
        submarine: shipFactory("submarine"),
      },
    },
    computer: {
      isPlacedAllShips: false,
      ships: {
        carrier: shipFactory("carrier"),
        cruiser: shipFactory("cruiser"),
        destroyer: shipFactory("destroyer"),
        submarine: shipFactory("submarine"),
      },
    },
  };

  // takes in click coordinates: the GridCell id (eg. "3" from <div id="P-3"></div>)
  // and then it places a ship starting at the selected position
  handleClick = (e) => {
    let clickedID = e.target.id;
    // this needs to be made dynamic so that the ships can be placed on after another
    // a loop can be used or a check where each ship is put in an array and then thats lopped through, running a putShipOnGrid if it's isPlaced = false
    // creates a shallow copy so that the state is not mutated directly
    const { carrier } = { ...this.state.user.ships };
    // the value changes but the state is not re-rendered because setState is not used
    carrier.isPlaced = true;
    carrier.gridPosition = [clickedID, "P2", "P3"];
  };

  render() {
    // the container will contain each GridCell with it's associated props
    let gridCellsContainer = [];
    // I want a grid of 10x10 so this loop pushes GridCells to the container 100 times
    for (let i = 1; i <= 100; i++) {
      gridCellsContainer.push(
        <GridCell
          key={i}
          id={`P${i}`}
          handleClick={this.handleClick}
          ships={this.state.user.ships}
        />
      );
    }

    return <div className="gameboard grid-10x10">{gridCellsContainer}</div>;
  }
}
