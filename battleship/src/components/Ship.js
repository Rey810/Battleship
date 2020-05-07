import React, { Component } from "react";

class Ship extends Component {
  state = {
    isSunk: false,
  };

  //  When we talk about mounting, we're talking about the process of converting the virtual components into actual DOM elements that are placed in the DOM by Reac
  componentDidMount() {
    this.shipBuilder(this.props.type);
    this.initHitStatus(this.props.length);
  }

  // maybe all of this can be lifted to the fleet component where the state can store all the ship types and they can be passed down here. Example, the type: "carrier" can be passed down as prop.type to the first instance of <Ship /> in fleet. Same for the length. Then the prop.length can be used for
  shipBuilder(typeStringInput) {
    // ensures that a string was inputted
    if (typeof typeStringInput !== "string") {
      throw new Error("You haven't inputted a string name for the ship");
    }
    // // status
    // this.setState({ type: this.props.type });
    // this.setState({ length: this.determineLength(this.props.type) });
  }

  initHitStatus(length) {
    let shipLength = length;
    let hitStatusArray = Array(shipLength).fill("false");
    this.setState({ hitStatus: hitStatusArray });
  }

  determineLength(type) {
    let typeLengths = {
      carrier: 5,
      cruiser: 4,
      destroyer: 3,
      submarine: 2,
    };
    return typeLengths[type];
  }

  // takes in a status array but defaults to the current hitStatus array
  isSunk() {
    let currenthitStatus = this.state.hitStatus;
    if (currenthitStatus.every((status) => status === true)) {
      this.setState({ isSunk: true });
    } else {
      return false;
    }
  }

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
    console.log("state in render after componentDidMount", this.state);
    return (
      <div className={this.props.type} data-testid={this.props.length}></div>
    );
  }
}

export default Ship;
