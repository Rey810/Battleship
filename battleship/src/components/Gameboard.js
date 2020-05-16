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
    placedAllShips: false,
    isFleetSunk: false,
    isGameOver: false,
    hitGridPositions: [],
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
    // // conputer ships' state
    // computerCarrier: shipFactory("carrier"),
    // computerCruiser: shipFactory("cruiser"),
    // computerDestroyer: shipFactory("destroyer"),
    // computerSubmarine: shipFactory("submarine"),
  };

  // 2 PLACE SHIP FUNCTIONS + 1 fleet placement status check function
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

  // HANDLE ATTACK UTILITY FUNCTIONS
  // 1. checkAttackAction: checks to see if there is a ship at the attack clicked position . Returns a ship object, the position on the ship that was hit (an index number which will be between 0 and the ships length - 1) and the attacked grid position
  // 2. applyHitToShipStatus: takes the returned ship object from checkAttackAction and the position on it's index that was hit and updates the ships hitStatus using the shipFactory #hit method
  checkAttackAction(arrayOfShips, attackedPos) {
    // for each ship, check its gridpositions and see if it has a grid position that matches attackedPosition
    let shipsArray = arrayOfShips;
    let gridPos = attackedPos;
    let hitPosition;
    let hitShip;
    let foundPos;
    // check each ship and return out of the function withe ship obj, the index position for the hit and the grid position for the hit
    try {
      for (let i = 0; i < shipsArray.length; i++) {
        // use the first key of the current ship obj (Object.keys is used so that it can be dynamic)
        console.log("shipsArray[i]", shipsArray[i]);
        const { gridPosition } = shipsArray[i];
        console.table(gridPosition);
        // condition when a position has been found that matches with the attackedPos
        foundPos = gridPosition.findIndex((position) => position === gridPos);
        // -1 is returned if an index for the condition is not found
        if (foundPos !== -1) {
          hitPosition = foundPos;
          hitShip = shipsArray[i];
          console.log("foundPos", foundPos);
          return {
            ship: hitShip,
            hitIndexPos: hitPosition,
            hitGridPos: attackedPos,
          };
        }
      }
      // this is returned when a hit on a ship is not successful
      return { ship: null, hitGridPos: attackedPos };
    } catch (e) {
      console.log(e);
    }
  }

  applyHitToShipHitStatus(shipObj, hitIndexPos) {
    // handle successful attack
    // apply hit() to ship. This actually updates the hitStatus of the ship
    try {
      const { hitStatus } = { ...shipObj };
      const { afterStatus } = shipObj.hit(hitStatus, hitIndexPos);
      // set the ship health status state
      this.setState(
        {
          [shipObj.type]: {
            ...this.state[shipObj.type],
            hitStatus: afterStatus,
          },
        },
        async () => {
          await this.isShipSunk(shipObj);
          this.isFleetSunk(this.state);
        }
      );
      alert("You hit a ship!");
    } catch (e) {
      console.log(e);
    }
  }

  isShipSunk(shipObj) {
    let ship = { ...this.state[shipObj.type] };
    Promise.resolve(ship.isSunkCheck(ship.hitStatus)).then((sunkStatus) =>
      this.setState({ [ship.type]: { ...ship, isSunk: sunkStatus } })
    );
  }

  isFleetSunk(state) {
    const { carrier, cruiser, destroyer, submarine } = state;
    let fleetStatus = [
      carrier.isSunk,
      cruiser.isSunk,
      destroyer.isSunk,
      submarine.isSunk,
    ];
    if (fleetStatus.every((status) => status === true)) {
      this.setState({ isFleetSunk: true });
    } else {
      return false;
    }
  }

  // HANDLES RECEIVING AN ATTACK
  // does 3 things:
  // 1. Finds a ship object that is hit
  // 2. Applies hit to the ships hit status
  // 3. updates the hit status state and the hitGridPositions state
  handleAttack(attackedPosition, shipStates = this.state) {
    try {
      let pos = attackedPosition;
      // destructure the ship states and put them in an array for inspection
      const { carrier, cruiser, destroyer, submarine } = {
        ...shipStates,
      };
      let shipsArray = [carrier, cruiser, destroyer, submarine];

      // get the details about the ship that was hit
      // ship will equal null if the attack missed the ship
      const { ship, hitIndexPos = null, hitGridPos } = this.checkAttackAction(
        shipsArray,
        pos
      );
      if (ship === null) {
        // handle unsuccessful attack
        // DOM change (up date the state of the grid cell where the hit took place)
        alert("You missed a ship!");
      } else {
        this.applyHitToShipHitStatus(ship, hitIndexPos);
      }
      // update the hitGridposition state
      this.setState({
        hitGridPositions: [...this.state.hitGridPositions, hitGridPos],
      });
    } catch (e) {
      console.log(e);
    }
  }

  // runs when there is a grid click but not all the ships are placed yet
  placeShip(clickedGridPos) {
    let numID = clickedGridPos;

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
    console.log("next ship", nextShip);
    this.setState({ [nextShip.type]: { ...nextShip } });

    //tell user that all ships are placed
    if (this.isFleetPlaced(this.state)) {
      this.setState({ placedAllShips: true });
    }
  }

  // takes in click coordinates: the GridCell id (eg. "3" from <div id="P-3"></div>)
  // and then it places a ship starting at the selected position
  handleClick = (e) => {
    let clickedGridPosID = e.target.id;
    let numID = parseInt(clickedGridPosID.replace("P", ""), 10);
    if (this.isFleetPlaced(this.state)) {
      alert("all ships placed, will now run handleAttack");
      this.handleAttack(numID, this.state);
    } else {
      console.warn("not all ships placed, will place ship now");
      this.placeShip(numID);
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
