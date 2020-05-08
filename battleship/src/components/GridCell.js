import React, { Component } from "react";

export default class GridCell extends Component {
  handleHover(e) {
    return e.target.classList.toggle("hovering");
  }

  // maybe handle click here to where the clicked position can bubble up to the gameboard component where it then renders the ship starting from the clicked position

  render() {
    const { id } = this.props;

    return (
      <div
        id={id}
        className="grid-cell"
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}
      ></div>
    );
  }
}
