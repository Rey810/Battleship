import React, { Component } from "react";

export default class GridCell extends Component {
  render() {
    const { id } = this.props;

    return <div id={id} className="grid-cell"></div>;
  }
}
