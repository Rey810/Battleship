// Your ‘ships’ will be objects that include their length, where they’ve been hit and whether or not they’ve been sunk.

// Ship factory function
// A few ships are needed:
// 1x carrier (length: 5)
// 1x cruiser (length: 4)
// 1x destroyer (length: 3)
// 1X submarine (length: 2)

function determineLength(type) {
  let typeLengths = {
    carrier: 5,
    cruiser: 4,
    destroyer: 3,
    submarine: 2,
  };
  return typeLengths[type];
}

export const shipFactory = (type) => {
  if (typeof type !== "string") {
    throw new Error("You haven't inputed a string name for the ship");
  }
  let length = determineLength(type);
  let isSunk = false;
  return { type, isSunk, length };
};

// REMEMBER you only have to test your object’s public interface. Only methods or properties that are used outside of your ‘ship’ object need unit tests.
// Ships should have a hit() function that takes a number and then marks that position as ‘hit’.

// isSunk() should be a function that calculates it based on their length and whether all of their positions are ‘hit’.
