import shipFactory from "../factories/shipFactory";

// checks the fundamental type and returns of the factory
it("the ship factory should be an object creator", () => {
  expect(shipFactory("carrier")).toMatchObject({ type: "carrier" });
});

it("the ship factory should return the inputted name as it's type", () => {
  expect(shipFactory("destroyer").type).toBe("destroyer");
});

it("the ship factory should hold the isSunk status", () => {
  expect(shipFactory("carrier").isSunk()).toBe(false);
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

it("should have an array with an length of the ships length", () => {
  expect(Array.isArray(shipFactory("carrier").hitStatus)).toBeTruthy();
});

it("should have a length matching the type of ship passed in", () => {
  expect(shipFactory("carrier").hitStatus.length).toEqual(
    shipFactory("carrier").length
  );
  expect(shipFactory("submarine").hitStatus.length).toEqual(
    shipFactory("submarine").length
  );
});

// checks the functions of the shipFactory
describe("ship factory functions", () => {
  //checks hit()
  describe("hit()", () => {
    //checks hit()
    it("makes sure that a hit function exists", () => {
      expect(typeof shipFactory("").hit).toBe("function");
    });

    it("throws an error if a number is not passed into hit()", () => {
      expect(() => {
        shipFactory("").hit();
      }).toThrow("You need to pass a number!");
    });

    it("ensures no change to health status if erroneous input is passed to hit()", () => {
      let carrier = shipFactory("carrier");
      // a hit at pos 10 can't work as the length of the hitStatus array is only 5
      carrier.hit(10);
      expect(carrier.hitStatus).toEqual([false, false, false, false, false]);
    });

    it("records a hit and change in the health status of ship", () => {
      let carrier = shipFactory("carrier");
      carrier.hit(1);
      expect(carrier.hitStatus).toEqual([false, true, false, false, false]);
    });

    it("records multiple hits and related changes in the hitStatus", () => {
      let carrier = shipFactory("carrier");
      carrier.hit(4);
      expect(carrier.hitStatus).toEqual([false, false, false, false, true]);
    });

    it("ensures preceding test is not a false positive", () => {
      let carrier = shipFactory("carrier");
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
      expect(typeof shipFactory("").isSunk).toBe("function");
    });

    it("the isSunk status returns true when the hitStatus is all true", () => {
      let carrier = shipFactory("carrier");
      carrier.hitStatus = Array(5).fill(true);
      console.log("test hit status", carrier.hitStatus);
      expect(carrier.isSunk(carrier.hitStatus)).toBe(true);
    });

    it("the isSunk status returns false when the hitStatus is not all true", () => {
      let carrier = shipFactory("carrier");
      console.table(carrier.hitStatus);
      expect(carrier.isSunk()).toBe(false);
    });
  });
});
