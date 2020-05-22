import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ShipsContainer extends Component {
  render() {
    const { carrier, cruiser, destroyer, submarine } = this.props.ships;
    const { isFleetPlaced } = this.props;
    return (
      <div>
        {isFleetPlaced === false ? <h1>Ships in the dock</h1> : ""}
        <div className="flex-even-row">
          <h2>{carrier.isPlaced === false ? "carrier" : ""}</h2>
          <h2>{cruiser.isPlaced === false ? "cruiser" : ""}</h2>
          <h2>{destroyer.isPlaced === false ? "destroyer" : ""}</h2>
          <h2>{submarine.isPlaced === false ? "submarine" : ""}</h2>
        </div>
      </div>
    );
  }
}

ShipsContainer.propTypes = {
  carrier: PropTypes.object,
  cruiser: PropTypes.object,
  destroyer: PropTypes.object,
  submarine: PropTypes.object,
};
