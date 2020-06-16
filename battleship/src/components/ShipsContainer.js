import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ShipsContainer extends Component {
  render() {
    const { carrier, cruiser, destroyer, submarine } = this.props.ships;
    const { isFleetPlaced } = this.props;
    return (
      <div class="margin-top-bottom">
        {isFleetPlaced === false ? (
          <h3 class="no-margin-bottom">Ships in the dock</h3>
        ) : (
          ""
        )}
        <div className="flex-even-row">
          <h4
            className={`bg-gray white ${
              carrier.isPlaced ? "" : "padding-small"
            }`}
          >
            {carrier.isPlaced === false ? "carrier" : ""}
          </h4>
          <h4
            className={`bg-gray white ${
              cruiser.isPlaced ? "" : "padding-small"
            }`}
          >
            {cruiser.isPlaced === false ? "cruiser" : ""}
          </h4>
          <h4
            className={`bg-gray white ${
              destroyer.isPlaced ? "" : "padding-small"
            }`}
          >
            {destroyer.isPlaced === false ? "destroyer" : ""}
          </h4>
          <h4
            className={`bg-gray white ${
              submarine.isPlaced ? "" : "padding-small"
            }`}
          >
            {submarine.isPlaced === false ? "submarine" : ""}
          </h4>
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
