/* eslint-disable no-unused-expressions */
import Gameboard from "../../components/Gameboard";

describe("Gameboard component functionality", () => {
  describe("handleClick()", () => {});

  describe("hasShip()", () => {
    it("should return a boolean", () => {
      let gameBoard = new Gameboard();
      let returnValue = gameBoard.hasShip("P-1");
      expect(typeof returnValue === "string").toBe(true);
    });
  });

  describe("getNextShipGP()", () => {
    it("should throw an error if erroneous inputs passed", () => {
      let gameBoard = new Gameboard();
      () => {
        expect(gameBoard.getNextShipGP("")).toThrow();
      };
    });

    it("should return an array with correct gridPositions", () => {
      let gameBoard = new Gameboard();
      expect(gameBoard.getNextShipGP([], 3, 4)).toEqual([3, 4, 5, 6]);
    });
  });

  describe("isFleetPlaced()", () => {
    it("returns false when the fleet IS NOT placed", () => {
      let state = {
        carrier: { isPlaced: false },
        cruiser: { isPlaced: false },
        destroyer: { isPlaced: false },
        submarine: { isPlaced: false },
      };
      let gameboard = new Gameboard();
      let booleanResult = gameboard.isFleetPlaced(state);
      expect(booleanResult).toBe(false);
    });

    it("returns true when the fleet IS placed", () => {
      let state = {
        carrier: { isPlaced: true },
        cruiser: { isPlaced: true },
        destroyer: { isPlaced: true },
        submarine: { isPlaced: true },
      };
      let gameboard = new Gameboard();
      let booleanResult = gameboard.isFleetPlaced(state);
      expect(booleanResult).toBe(true);
    });
  });

  describe("checkAttackAction()", () => {
    let gameboard = new Gameboard();
    let shipsArray = [
      {
        type: "carrier",
        gridPosition: [1, 2, 3, 4, 5],
      },
      {
        type: "cruiser",
        gridPosition: [50, 51, 52, 53],
      },
    ];
    it("returns a hit ship and the position", () => {
      expect(gameboard.checkAttackAction(shipsArray, 4)).toMatchObject({
        ship: { type: "carrier", gridPosition: [1, 2, 3, 4, 5] },
        hitIndexPos: 3,
        hitGridPos: 4,
      });
    });
    it("returns a null ship when an attack misses", () => {
      expect(gameboard.checkAttackAction(shipsArray, 25)).toMatchObject({
        ship: null,
        hitGridPos: 25,
      });
    });
  });

  describe("handleAttack()", () => {
    let gameboard = new Gameboard();
    // mock state for a carrier
    let shipState = {
      type: "carrier",
      hitStatus: [false, false, false, false, false],
      gridPosition: [52, 53, 54, 55, 56],
    };

    it("returns an object of the old hitStatus vs the new hit Status", () => {});
  });
});
