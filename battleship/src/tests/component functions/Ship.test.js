/* eslint-disable no-unused-expressions */
// import React from "react";
// import { render } from "@testing-library/react";

// test('renders learn react link', () => {
// const { getByText } = render(<App />);
// const linkElement = getByText(/learn react/i);
// expect(linkElement).toBeInTheDocument();
// });

import Ship from "../../components/Ship";

describe("basic ship class tests", () => {
  it("checks that the imported ship is a function", () => {
    expect(typeof Ship).toBe("function");
  });

  // checks the fundamental type and returns of the factory
  it("checks the presence of correct state in a new ship instance", () => {
    let shipInstance = new Ship();
    expect(shipInstance.state).toBeTruthy();
  });

  it("checks that the state has been updated", () => {
    let shipInstance = new Ship();
    shipInstance.state.isSunk = true;
    expect(shipInstance.state).toMatchObject({ isSunk: true });
  });

  //checks the correct lengths of
  it("returns the correct state.type (when set directly)", () => {
    let shipInstance = new Ship();
    // rewrite this test to use the prop passed down from the fleet
    shipInstance.state.type = "carrier";
    expect(shipInstance.state).toMatchObject({ type: "carrier" });
  });

  // it("the hitStatus state is an array", () => {
  //   let shipInstance = new Ship();
  //   expect(Array.isArray(shipInstance.state.hitStatus)).toBeTruthy();
  // });

  it("the isSunk state is a boolean", () => {
    let shipInstance = new Ship();
    expect(shipInstance.state.isSunk).toEqual(false);
  });
});

// checks the functions of the Ship
describe("functions", () => {
  // it("initHitStatus", () => {
  //   let shipInstance = new Ship();
  //   expect(shipInstance.initHitStatus(2)).toEqual([false, false]);
  // });
  //checks hit()
  describe("hit()", () => {
    let shipInstance = new Ship();
    shipInstance.state.hitStatus = Array(5).fill(false);
    shipInstance.state.isSunk = false;
    it("makes sure that a hit function exists", () => {
      expect(typeof shipInstance.hit).toBe("function");
    });

    it("throws an error if a number is not passed into hit()", () => {
      expect(() => {
        shipInstance.hit();
      }).toThrow("You need to pass a number!");
    });

    it("ensures an error is thrown if a hit outside the ship length is passed", () => {
      expect(() => {
        shipInstance.hit(10);
      }).toThrow("Your hit cannot be placed on the health status array");
    });
  });
  // checks isSunk()
  describe("isSunk()", () => {
    let shipInstance = new Ship();
    shipInstance.state.hitStatus = Array(5).fill(false);
    shipInstance.state.isSunk = false;
    it("makes sure that a isSunk function exists", () => {
      expect(typeof shipInstance.isSunk).toBe("function");
    });
  });
});
