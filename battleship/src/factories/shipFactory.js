// Your ‘ships’ will be objects that include their length, where they’ve been hit and whether or not they’ve been sunk.

// Ship factory function
// A few ships are needed:
// 1x carrier (length: 5)
// 1x cruiser (length: 4)
// 1x destroyer (length: 3)
// 1X submarine (length: 2)

function determineLength(shipType) {
  let shipTypeLengths = {
    carrier: 5,
    cruiser: 4,
    destroyer: 3,
    submarine: 2,
  };
  return shipTypeLengths[shipType];
}

const shipFactory = (shipTypeStringInput) => {
  // ensures that a string was inputted
  if (typeof shipTypeStringInput !== "string") {
    throw new Error("You haven't inputted a string name for the ship");
  }

  // initial ship status
  let type = shipTypeStringInput;
  let length = determineLength(type);
  let hitStatus = Array(length).fill(false);
  let gridPosition = {};

  // functions
  function hit(posNum) {
    // ensures that a number was passed as a variable
    if (typeof posNum !== "number") {
      throw new Error("You need to pass a number!");
    }

    // parameters
    // Abbreviations:
    // 1. afterStatus   =   after hit health status
    // 2. beforeStatus  =   before hit health status
    let beforeStatus = hitStatus;
    let targetPosition = posNum;
    let isHit = false;
    let afterStatus = [];
    // hit can only work if it's within the range of the health status array length
    try {
      if (targetPosition < hitStatus.length && targetPosition >= 0) {
        afterStatus = [...beforeStatus, (beforeStatus[targetPosition] = true)];
        isHit = true;
        hitStatus = afterStatus;
      } else {
        // this maintains the current health status of the ship if a hit fails
        afterStatus = beforeStatus;
        throw new Error("Your hit cannot be placed on the health status array");
      }
    } catch (err) {
      //console.log(err);
      // handle error
    }

    return { isHit, position: targetPosition };
  }

  function isSunk(shipHitStatus = hitStatus) {
    console.log("hit status", shipHitStatus);
    let currenthitStatus = shipHitStatus;
    return currenthitStatus.every((status) => status === true);
  }

  return { type, length, hitStatus, isSunk, hit, gridPosition };
};

// REMEMBER you only have to test your object’s public interface. Only methods or properties that are used outside of your ‘ship’ object need unit tests.
// Ships should have a hit() function that takes a number and then marks that position as ‘hit’.

// isSunk() should be a function that calculates it based on its length and whether all of its positions are ‘hit’.

export default shipFactory;
