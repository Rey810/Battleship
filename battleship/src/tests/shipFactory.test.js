/* eslint-disable no-unused-expressions */
// import React from "react";
// import { render } from "@testing-library/react";
// import App from "./App";

// test('renders learn react link', () => {
// const { getByText } = render(<App />);
// const linkElement = getByText(/learn react/i);
// expect(linkElement).toBeInTheDocument();
// });

import Ship from "../factories/shipFactory";

// checks the fundamental type and returns of the factory
it("the ship factory should be an object creator", () => {
  expect(Ship("carrier")).toMatchObject({ type: "carrier" });
});

it("the ship factory should return the inputted name as it's type", () => {
  expect(Ship("destroyer").type).toBe("destroyer");
});

it("the ship factory should hold the isSunk status", () => {
  expect(Ship("carrier").isSunk()).toBe(false);
});

it("should throw an error if a string isn't passed in", () => {
  () => {
    expect(Ship(2343)).toThrow();
  };
});

//checks the correct lengths of
it("should return the correct length based on type", () => {
  expect(Ship("carrier").length).toEqual(5);
  expect(Ship("cruiser").length).toEqual(4);
  expect(Ship("destroyer").length).toEqual(3);
  expect(Ship("submarine").length).toEqual(2);
});

it("should have an array with an length of the ships length", () => {
  expect(Array.isArray(Ship("carrier").hitStatus)).toBeTruthy();
});

it("should have a length matching the type of ship passed in", () => {
  expect(Ship("carrier").hitStatus.length).toEqual(Ship("carrier").length);
  expect(Ship("submarine").hitStatus.length).toEqual(Ship("submarine").length);
});

// checks the functions of the Ship
describe("ship factory functions", () => {
  //checks hit()
  describe("hit()", () => {
    //checks hit()
    it("makes sure that a hit function exists", () => {
      expect(typeof Ship("").hit).toBe("function");
    });

    it("throws an error if a number is not passed into hit()", () => {
      expect(() => {
        Ship("").hit();
      }).toThrow("You need to pass a number!");
    });

    it("ensures no change to health status if erroneous input is passed to hit()", () => {
      let carrier = Ship("carrier");
      // a hit at pos 10 can't work as the length of the hitStatus array is only 5
      carrier.hit(10);
      expect(carrier.hitStatus).toEqual([false, false, false, false, false]);
    });

    it.only("records a hit and change in the health status of ship", () => {
      let carrier = Ship("carrier");
      carrier.hit(1);
      expect(carrier.hitStatus).toEqual([false, true, false, false, false]);
    });

    it.only("records multiple hits and related changes in the hitStatus", () => {
      let carrier = Ship("carrier");
      carrier.hit(4);
      expect(carrier.hitStatus).toEqual([false, false, false, false, true]);
    });

    it("ensures preceding test is not a false positive", () => {
      let carrier = Ship("carrier");
      carrier.hit(1);
      expect(carrier.hitStatus).not.toEqual([
        false,
        false,
        false,
        false,
        false,
      ]);
    });
  });

  // checks isSunk()
  describe("isSunk()", () => {
    it("makes sure that a isSunk function exists", () => {
      expect(typeof Ship("").isSunk).toBe("function");
    });

    it("the isSunk status returns true when the hitStatus is all true", () => {
      let carrier = Ship("carrier");
      carrier.hitStatus = Array(5).fill(true);
      console.log("test hit status", carrier.hitStatus);
      expect(carrier.isSunk(carrier.hitStatus)).toBe(true);
    });

    it("the isSunk status returns false when the hitStatus is not all true", () => {
      let carrier = Ship("carrier");
      console.table(carrier.hitStatus);
      expect(carrier.isSunk()).toBe(false);
    });
  });
});
