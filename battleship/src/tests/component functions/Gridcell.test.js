import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "../../components/Gameboard";
import GridCell from "../../components/GridCell";

describe("gridcell functionality", () => {
  it("grid cell has a handleHover function", () => {
    let GCinstance = new GridCell();
    expect(typeof GCinstance.handleHover).toBe("function");
  });

  it("handleHover()", () => {
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
});
