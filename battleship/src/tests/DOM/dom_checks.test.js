import React from "react";
import { render } from "@testing-library/react";
import Ship from "../../components/Ship";

test("correct class name based on passed down prop", () => {
  // container is a reference to the DOM node where the component is mounted
  const { container } = render(<Ship shipType="carrier" />);
  expect(container.firstChild.className).toBe("carrier");
});

test("correct state (type and length) based on passed down props", () => {
  const { container } = render(<Ship shipType={"submarine"} shipLength={2} />);
  expect(container.firstChild.classList.contains("submarine")).toBe(true);
});

describe("DOM rendering and state checking tests", () => {
  // this needs to be checked when the prop is passed down
  it("checks the length data-attribute of all the ships instances instance", () => {
    const { getByTestId } = render(
      <Ship shipType={"carrier"} shipLength={"5"} />
    );
    expect(getByTestId("5")).toBeTruthy();
  });

  // these need to be checked with separate component tests
  it("records a hit and change in the health status of ship", () => {});

  it("records multiple hits and related changes in the hitStatus", () => {
    // let carrier = Ship("carrier");
    // carrier.hit(4);
    // expect(carrier.hitStatus).toEqual([false, false, false, false, true]);
  });

  it("ensures preceding test is not a false positive", () => {
    // let carrier = Ship("carrier");
    // carrier.hit(1);
    // expect(carrier.hitStatus).not.toEqual([
    //   false,
    //   false,
    //   false,
    //   false,
    //   false,
    // ]);
  });

  it("the isSunk status returns true when the hitStatus is all true", () => {
    // let carrier = Ship("carrier");
    // carrier.hitStatus = Array(5).fill(true);
    // console.log("test hit status", carrier.hitStatus);
    // expect(carrier.isSunk(carrier.hitStatus)).toBe(true);
  });

  it("the isSunk status returns false when the hitStatus is not altrue", () => {
    // let carrier = Ship("carrier");
    // console.table(carrier.hitStatus);
    // expect(carrier.isSunk()).toBe(false);
  });
});
