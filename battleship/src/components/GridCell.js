import React, { Component } from "react";
import PropTypes from "prop-types";
import "../css/gridcell.css";

export default class GridCell extends Component {
  state = {
    // maybe hasShip should be in the state here
    // maybe it can be determined in the gameboard component
    // or it can be passed down as a prop
    classList: [],
  };

  handleHover(e) {
    return e.target.classList.toggle("hovering");
  }

  // maybe this should be called when the hasShip state changes
  changeBGcolour = () => {
    const { classList } = this.state;
    this.setState({ classList: [...classList, "hasShip"] });
    console.log(this.state);
  };

  // contains all of the gridPositions which the gridCell uses to calculate if it should change it's colour
  hasShip = (id) => {
    const { carrier, cruiser, destroyer, submarine } = this.props.ships;
    console.log(carrier.type, cruiser.type, destroyer.type, submarine.type);

    // destructure all of the grid positinos of each ship
    const { gridPosition: carrierPos } = carrier;
    const { gridPosition: cruiserPos } = cruiser;
    const { gridPosition: destroyerPos } = destroyer;
    const { gridPosition: submarinePos } = submarine;

    // keep all the positions in an array
    const allPositions = [
      ...carrierPos,
      ...cruiserPos,
      ...destroyerPos,
      ...submarinePos,
    ];

    console.log(allPositions);

    // loop through the positions and change the grid cell bg colour if one is found
    allPositions.map((pos) => {
      if (id === pos) {
        console.log("id:", id, "gridPosition:", pos);
        // change the background colour of the grid
        this.changeBGcolour();
      }
    });
  };

  // maybe handle click here to where the clicked position can bubble up to the gameboard component where it then renders the ship starting from the clicked position

  render() {
    const { id, handleClick } = this.props;
    return (
      <div
        id={id}
        className={`grid-cell 
        ${this.state.classList}`}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}
        onClick={(e) => {
          handleClick(e);
          this.hasShip(id);
        }}
      ></div>
    );
  }
}

//proptypes
// good practice
GridCell.propTypes = {
  id: PropTypes.string.isRequired,
};
