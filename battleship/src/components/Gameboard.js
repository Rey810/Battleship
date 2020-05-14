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
    // 6. hitStatus

    // user ships' state
    carrier: shipFactory("carrier"),
    cruiser: shipFactory("cruiser"),
    destroyer: shipFactory("destroyer"),
    submarine: shipFactory("submarine"),
    // conputer ships' state
    computerCarrier: shipFactory("carrier"),
    computerCruiser: shipFactory("cruiser"),
    computerDestroyer: shipFactory("destroyer"),
    computerSubmarine: shipFactory("submarine"),
  };

  // 3 PLACE SHIP FUNCTIONS + 1 fleet placement status check function
  // returns the next ship object based on it's isPlaced boolean
  getNextShip(state) {
    const { carrier, cruiser, destroyer, submarine } = {
      ...state,
    };
    let shipsArray = [carrier, cruiser, destroyer, submarine];
    // the ship which will be placed now
    let nextShip;
    shipsArray.some((shipObj) => {
      if (shipObj.isPlaced === false) {
        return (nextShip = shipObj);
      }
    });

    // the ship which has not been placed
    return nextShip;
  }

  // returns a formatted key for use in setting the state when a ship is placed
  // commented out due to a simplified key name which doesn't require formatting
  // getNextShipKey(shipType) {
  //   // derive nextShip key name from it's type
  //   return `user${shipType[0].toUpperCase()}${shipType.slice(1)}`;
  // }

  // builds the grid position array for the next ship to be placed
  getNextShipGP(arr, num, length) {
    try {
      if (
        typeof arr !== "object" ||
        typeof num !== "number" ||
        typeof length !== "number"
      ) {
        throw new TypeError();
      }

      let gridPositions = arr;
      let startingPos = num;
      let shipLength = length;
      let currNum = startingPos;

      for (let i = 1; i <= shipLength; i++) {
        // length number of times, add a number to the array
        gridPositions.push(currNum);
        currNum += 1;
      }

      return gridPositions;
    } catch (e) {
      console.log(e.message);
    }
  }

  isFleetPlaced(state) {
    const { carrier, cruiser, destroyer, submarine } = {
      ...state,
    };
    let shipsArray = [carrier, cruiser, destroyer, submarine];
    return shipsArray.every((shipObj) => shipObj.isPlaced === true);
  }

  checkAttackAction(arrayOfShips, attackedPos) {
    // for each ship, check its gridpositions and see if it has a grid position that matches attackedPosition
    let shipsArray = arrayOfShips;
    let gridPos = attackedPos;
    let hitPosition;
    let hitShip;
    let foundPos;
    // check each ship and return out of the function withe ship obj, the index position for the hit and the grid position for the hit
    for (let i = 0; i <= shipsArray.length; i++) {
      // use the first key of the current ship obj (Object.keys is used so that it can be dynamic)
      const {
        [Object.keys(shipsArray[i])[0]]: { gridPosition },
      } = shipsArray[i];

      // condition when a position has been found that matches with the attackedPos
      if (
        (foundPos = gridPosition.findIndex((position) => position === gridPos))
      ) {
        hitPosition = foundPos;
        hitShip = shipsArray[i];

        return {
          ship: hitShip,
          hitIndexPos: hitPosition,
          hitGridPos: hitPosition + 1,
        };
      }

      // handle here when an attacked position does not find a ship
      // do something to show a missed hit on the grid
      return { ship: null, hitGridPos };
    }
  }

  // HANDLES RECEIVING AN ATTACK
  receiveAttack(attackedPosition, shipStates) {
    try {
      let pos = attackedPosition;
      // destructure the ship states and put them in an array for inspection
      const { carrier, cruiser, destroyer, submarine } = { ...shipStates };
      let shipsArray = [carrier, cruiser, destroyer, submarine];

      // get the details about the ship that was hit
      const { ship, hitIndexPos = null, hitGridPos } = this.checkShips(
        shipsArray,
        pos
      );
      // check the grid positions and compare to the received attack position. If they match, run the hit function on the ship that contains that position using the current hitStatus state and then updating the hitStatus afterwards
    } catch (e) {
      console.log(e);
    }
  }

  // takes in click coordinates: the GridCell id (eg. "3" from <div id="P-3"></div>)
  // and then it places a ship starting at the selected position
  handleClick = (e) => {
    // e.target is the GridCell component's html element
    let clickedID = e.target.id;
    // remove the letter from the clicked id to make adding up easier
    let numID = parseInt(clickedID.replace("P", ""), 10);

    // the nextShip is chosen by it's isPlaced boolean
    let nextShip = this.getNextShip(this.state);
    // the value changes but the state is not re-rendered because setState is not used
    nextShip.isPlaced = true;

    // the current positions, clicked grid cell id and ship length are passed to the function
    nextShip.gridPosition = [
      ...this.getNextShipGP(nextShip.gridPosition, numID, nextShip.length),
    ];

    // formats the ship key for easy state management
    // let nextShipKey = this.getNextShipKey(nextShip.type);
    // setState here so that the gameboard component gets re-rendered
    this.setState({ [nextShip]: { ...nextShip } });

    //tell user that all ships are placed
    if (this.isFleetPlaced(this.state)) {
      this.setState({ userIsPlacedAllShips: true });
      alert("all ships placed!");
    }
  };

  // takes a number id
  // compares id to an array containing all the ships' gridPositions
  // Returns "hasSHip" if the id is found in one of the grid positions
  hasShip(gridcellID) {
    // all the grid positions of all the ships
    let shipGridPositions = [
      ...this.state.carrier.gridPosition,
      ...this.state.cruiser.gridPosition,
      ...this.state.destroyer.gridPosition,
      ...this.state.submarine.gridPosition,
    ];

    // this value is passed down as a prop to the gridCell component
    // the returned string is a css class name
    return shipGridPositions.some((position) => position === gridcellID)
      ? "hasShip"
      : "";
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
