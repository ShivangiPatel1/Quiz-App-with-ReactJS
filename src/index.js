import React, { Component } from "react";

import ReactDOM from "react-dom";

import "./assets/style.css";
import quizService from "./quizService";
import QuestionBox from "./Components/QuestionBox";
import ScoreBoard from "./Components/ScoreBoard";

class QuizBee extends Component {
  state = {
    questionBank: [],
    score:0,
    response:0,
  };
  getQuestions = () => {
    quizService().then((question) => {
      this.setState({
        questionBank: question,
      });
    });
  };
  computeAnswer=(answer,correctAnswer) =>{
      if(answer===correctAnswer){
        this.setState({
            score:this.state.score+1
        });
      }
    this.setState({
        response:this.state.response <5 ? this.state.response +1:5
    });
  }

  playAgain=()=>{
   this.getQuestions();
   this.setState({
       score:0,
       response:0
   })   
  }

  componentDidMount() {
    this.getQuestions();
  }

  render() {
    return (
      <div className="container">
      {this.state.response}
        <div className="title">QuizBee</div>
        {this.state.questionBank.length > 0  && this.state.response < 5 &&
          this.state.questionBank.map(
            ({ question, answers, correct, questionId }) => (
              <QuestionBox
                question={question}
                options={answers}
                key={questionId}
                selected={answer=>this.computeAnswer(answer,correct)}
              />
            )
          )}
          
         {this.state.response === 5 ? <ScoreBoard score={this.state.score} playAgain={this.playAgain}/> : null}
      </div>
    );
  }
}

ReactDOM.render(<QuizBee />, document.getElementById("root"));
