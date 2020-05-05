/* eslint-disable no-unused-expressions */
// import React from "react";
// import { render } from "@testing-library/react";
// import App from "./App";

// test('renders learn react link', () => {
// const { getByText } = render(<App />);
// const linkElement = getByText(/learn react/i);
// expect(linkElement).toBeInTheDocument();
// });

import { shipFactory } from "../factories/shipFactory";

// checks the fundamental type and returns of the factory
it("the ship factory should be an object creator", () => {
  expect(shipFactory("carrier")).toMatchObject({ type: "carrier" });
});

it("the ship factory should return the inputted name as it's type", () => {
  expect(shipFactory("destroyer").type).toBe("destroyer");
});

it("the ship factory should hold the isSunk status", () => {
  expect(shipFactory("carrier").isSunk).toBe(false);
});

it("should throw an error if a string isn't passed in", () => {
  () => {
    expect(shipFactory(2343)).toThrow();
  };
});

//checks the correct lengths of
it("should return the correct length based on type", () => {
  expect(shipFactory("carrier").length).toEqual(5);
  expect(shipFactory("cruiser").length).toEqual(4);
  expect(shipFactory("destroyer").length).toEqual(3);
  expect(shipFactory("submarine").length).toEqual(2);
});
