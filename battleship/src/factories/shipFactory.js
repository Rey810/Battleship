import React, { Component } from "react";

class Ship extends Component {
  state = {
    hitStatus: [],
    isSunk: false,
  };

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
    try {
      if (targetPosition < this.state.hitStatus.length && targetPosition >= 0) {
        afterStatus = [...beforeStatus, (beforeStatus[targetPosition] = true)];
        isHit = true;
        this.setState({ hitStatus: [...afterStatus] });
      } else {
        // this maintains the current health status of the ship if a hit fails
        afterStatus = this.state.hitStatus;
        throw new Error("Your hit cannot be placed on the health status array");
      }
    } catch (err) {
      //console.log(err);
      // handle error
    }

    return { isHit, position: targetPosition };
  }

  shipBuilder(typeStringInput) {
    // ensures that a string was inputted
    if (typeof typeStringInput !== "string") {
      throw new Error("You haven't inputed a string name for the ship");
    }

    // status
    this.setState({ type: typeStringInput });
    this.setState({ length: this.determineLength(this.state.type) });
  }

  render() {
    return <div className={this.state.type}></div>;
  }
}

export default Ship;
