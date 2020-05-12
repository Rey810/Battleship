import Gameboard from "../../components/Gameboard";
import React from "react";
import { render, fireEvent } from "@testing-library/react";

describe("Gameboard component functionality", () => {
  describe("handleClick()", () => {
    it("should correctly handle the click", () => {});
  });
  describe("hasShip()", () => {
    it("should return a boolean", () => {
      let gameBoard = new Gameboard();
      let returnValue = gameBoard.hasShip("P-1");
      expect(typeof returnValue === "boolean").toBe(true);
    });

    it("should colour the right grid positions", () => {});
  });
});
