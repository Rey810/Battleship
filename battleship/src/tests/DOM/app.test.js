import React from "react";
import { render } from "@testing-library/react";
import App from "../../components/App";

describe("general app DOM behaviour", () => {
  it("renders app title", () => {
    const { getByText } = render(<App />);
    expect(getByText("Battleship")).toBeInTheDocument();
  });
});
