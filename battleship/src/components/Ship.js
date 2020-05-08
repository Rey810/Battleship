import React, { Component } from "react";

class Ship extends Component {
  state = {
    isSunk: false,
  };

  //  When we talk about mounting, we're talking about the process of converting the virtual components into actual DOM elements that are placed in the DOM by React
  componentDidMount() {
    this.shipBuilder(this.props.shipType);
    this.initHitStatus(this.props.shipLength);
  }

  // maybe all of this can be lifted to the fleet component where the state can store all the ship shipTypes and they can be passed down here. Example, the shipType: "carrier" can be passed down as prop.shipType to the first instance of <Ship /> in fleet. Same for the length. Then the prop.length can be used for
  shipBuilder(shipTypeStringInput) {
    // ensures that a string was inputted
    if (typeof shipTypeStringInput !== "string") {
      throw new Error("You haven't inputted a string name for the ship");
    }
    // // status
    this.setState({ shipType: this.props.shipType });
    this.setState({ length: this.determineLength(this.props.shipType) });
  }

  initHitStatus(length) {
    let shipLength = length;
    let hitStatusArray = Array(shipLength).fill("false");
    this.setState({ hitStatus: hitStatusArray });
  }

  determineLength(shipType) {
    let shipTypeLengths = {
      carrier: 5,
      cruiser: 4,
      destroyer: 3,
      submarine: 2,
    };
    return shipTypeLengths[shipType];
  }

  // this function may need to be lifted to a gameboard component
  isSunk() {
    let currenthitStatus = this.state.hitStatus;
    if (currenthitStatus.every((status) => status === true)) {
      this.setState({ isSunk: true });
    } else {
      return false;
    }
  }

  // this function may needed to be lifted to a gameboard component
  hit(posNum) {
    // ensures that a number was passed as a variable
    if (typeof posNum !== "number") {
      throw new Error("You need to pass a number!");
    }
    // parameters
    // Abbreviations:
    // 1. afterStatus   =   after hit health status
    // 2. beforeStatus  =   before hit health status
    let beforeStatus = this.state.hitStatus;
    let targetPosition = posNum;
    let isHit = false;
    let afterStatus = [];
    // hit can only work if it's within the range of the health status array length
    if (targetPosition < this.state.hitStatus.length && targetPosition >= 0) {
      afterStatus = [...beforeStatus, (beforeStatus[targetPosition] = true)];
      isHit = true;
      this.setState({ hitStatus: [...afterStatus] });
    } else {
      throw new Error("Your hit cannot be placed on the health status array");
    }
    return { isHit, position: targetPosition };
  }

  render() {
    const { shipType, shipLength } = this.props;
    return (
      <div className={shipType} data-testid={shipLength}>
        {/* the component display might be rendered here but it would probably make sense if it's just handled at the gameboard level where a grid display will be present */}
      </div>
    );
  }
}

export default Ship;
