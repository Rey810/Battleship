import React, { Component } from "react";
import PropTypes from "prop-types";
import "../css/gridcell.css";

export default class GridCell extends Component {
  // state = {
  //   // maybe hasShip should be in the state here
  //   // maybe it can be determined in the gameboard component
  //   // or it can be passed down as a prop
  //   classList: [],
  // };

  handleHover(e) {
    return e.target.classList.toggle("hovering");
  }

  getClasses() {
    const { hasShip } = this.props;
    return hasShip ? "hasShip" : "";
  }

  render() {
    const { id, handleClick } = this.props;

    return (
      <div
        id={id}
        className={`grid-cell 
        ${this.getClasses()}`}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}
        onClick={handleClick}
      ></div>
    );
  }
}

//proptypes
// good practice
GridCell.propTypes = {
  id: PropTypes.string.isRequired,
};
