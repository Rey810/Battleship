import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Scoreboard extends Component {
  render() {
    // assign default values
    const { userName = "User", userScore = 0, computerScore = 0 } = this.props;
    return (
      <section>
        <h4 className="no-margin-top-bottom">
          {userName} {userScore} : {computerScore} Computer
        </h4>
      </section>
    );
  }
}

Scoreboard.propTypes = {
  userName: PropTypes.string.isRequired,
  userScore: PropTypes.number.isRequired,
  computerScore: PropTypes.number.isRequired,
};
