import React from "react";

const ScoreBoard = ({score, playAgain}) => (
  <div className="score-board">
   <div className="score">You have scored {score} / 5 correct answers!</div>
    <button className="playBtn" onClick={playAgain}>Play Again!</button>
  </div>
);

export default ScoreBoard;
