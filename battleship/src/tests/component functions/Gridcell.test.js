import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "../../components/Gameboard";
import GridCell from "../../components/GridCell";
import Gameboard from "../../components/Gameboard";

describe("gridcell functionality", () => {
  it("hovering class is applied on grid cell hover", () => {
    const { container } = render(<GridCell id="P-8" />);
    const gridcell = container.firstChild;
    expect(gridcell.classList.contains("grid-cell")).toBe(true);

    fireEvent.mouseEnter(gridcell);
    expect(gridcell.classList.contains("grid-cell")).toBe(true);
    expect(gridcell.classList.contains("hovering")).toBe(true);

    fireEvent.mouseLeave(gridcell);
    expect(gridcell.classList.contains("grid-cell")).toBe(true);
    expect(gridcell.classList.contains("hovering")).toBe(false);
  });

  it("hasShip class (bg color change) is applied on grid cell click", () => {
    const { container } = render(<Gameboard />);

    const gridcell = container.querySelector("#P1");
    expect(gridcell.classList.contains("hasShip")).toBe(false);

    fireEvent.click(gridcell);
    expect(gridcell.classList.contains("hasShip")).toBe(true);
  });
});
