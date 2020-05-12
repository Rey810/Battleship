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
    userIsPlacedAllShips: false,
    computerIsPlacedAllShips: false,
    isGameOver: false,
    // each shipFactory returns the following:
    // 1. isPlaced: Boolean
    // 2. gridPosition: Array
    // 3. isSunk: function
    // 4. length: Number
    // 5. Type: String

    // user ships' state
    userCarrier: shipFactory("carrier"),
    userCruiser: shipFactory("cruiser"),
    userDestroyer: shipFactory("destroyer"),
    userSubmarine: shipFactory("submarine"),
    // conputer ships' state
    computerCarrier: shipFactory("carrier"),
    computerCruiser: shipFactory("cruiser"),
    computerDestroyer: shipFactory("destroyer"),
    computerSubmarine: shipFactory("submarine"),
  };

  // takes in click coordinates: the GridCell id (eg. "3" from <div id="P-3"></div>)
  // and then it places a ship starting at the selected position
  handleClick = (e) => {
    let clickedID = e.target.id;
    // remove the letter from the clicked id to make adding up easier
    // clean ID
    let numID = parseInt(clickedID.replace("P", ""), 10);
    // let cleanedID = parseInt(cleanedID, 10);
    // console.log(cleanedID);
    // this needs to be made dynamic so that the ships can be placed on after another
    // a loop can be used or a check where each ship is put in an array and then thats lopped through, running a putShipOnGrid if it's isPlaced = false
    // creates a shallow copy so that the state is not mutated directly
    const { userCarrier } = { ...this.state };
    // the value changes but the state is not re-rendered because setState is not used
    userCarrier.isPlaced = true;
    userCarrier.gridPosition = [numID, numID + 1, numID + 2];

    // setState here so that the gameboard component gets re-rendered
    this.setState({ userCarrier: { ...userCarrier } });
  };

  hasShip(gridcellID) {
    // takes a number id, compares id to an array containing all the gridPositions (positions which the ship should occupy) and returning true if the id is found in one of the grid positions

    // all the grid positions of all the ships
    let shipGridPositions = [
      ...this.state.userCarrier.gridPosition,
      ...this.state.userCruiser.gridPosition,
      ...this.state.userDestroyer.gridPosition,
      ...this.state.userSubmarine.gridPosition,
    ];

    // this value is passed down as a prop to the gridCell component where it will add a "hasShip" class if true
    return shipGridPositions.some((position) => position === gridcellID);
  }

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
          hasShip={this.hasShip(i)}
        />
      );
    }

    return <div className="gameboard grid-10x10">{gridCellsContainer}</div>;
  }
}
