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

  describe("checkAttackAction()", () => {
    it("returns a hit ship and the position", () => {
      let gameboard = new Gameboard();
      let shipsArray = [
        {
          carrier: { gridPosition: [1, 2, 3, 4, 5] },
        },
        {
          cruiser: { gridPosition: [50, 51, 52, 53] },
        },
      ];
      expect(gameboard.checkAttackAction(shipsArray, 4)).toMatchObject({
        ship: { carrier: { gridPosition: [1, 2, 3, 4, 5] } },
        hitIndexPos: 3,
        hitGridPos: 4,
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
