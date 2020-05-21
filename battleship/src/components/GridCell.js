import React, { Component } from "react";
import PropTypes from "prop-types";
import "../css/gridcell.css";

export default class GridCell extends Component {
  addHoveringClass(e) {
    return e.target.classList.add("hovering");
  }

  removeHoveringClass(e) {
    return e.target.classList.remove("hovering");
  }

  render() {
    const {
      id,
      handleClick,
      hasShipClass,
      hasHitClass,
      shipHitClass,
    } = this.props;

    return (
      <div
        id={id}
        className={`grid-cell light-border
        ${hasShipClass} ${hasHitClass} ${shipHitClass}`}
        onMouseEnter={this.addHoveringClass}
        onMouseLeave={this.removeHoveringClass}
        onClick={(e) => {
          handleClick(e);
          this.removeHoveringClass(e);
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
