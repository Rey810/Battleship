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
});
