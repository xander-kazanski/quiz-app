import React, { useEffect, useState } from 'react';
import "./check.css"

function Check(props) {

  function Question(props) {
    // todo create function to randoomize where the correct answer is
    const Answers = props.incorrect_answers.concat(props.correct_answer).map((answer, idx) => {
      const isRight = props.correct_answer === props.selectedAnswer;
      return <button key={idx} 
        className="btn"
        id={(function () {
          if (props.selectedAnswer === answer) {
            if (isRight) {
              return 'selected-correct';
            } else {
              return 'selected-wrong';
            }
          } else {
            if (props.selectedAnswer === answer) {
              return 'selected-wrong'
            } else if (props.correct_answer == answer) {
              return 'selected-correct'
            }
            return 'ghost';
          }
        })()} type="button">{answer}</button>
    })
    return (
      <section className={`question ${props.isFirst ? '' : 'first-question'}`}>
        <p className="title">{props.question}</p>
        <div className="answer">
          {Answers}
        </div>
      </section>
    )
  }

  const Questions = props.gameData.map((question, idx) => {
    return <Question selectedAnswer={props.answers[question.question]}
      key={idx} {...question} isFirst={idx === 0} setAnswers={props.setAnswers} />
  })

  function Result(props) {
    return <div className="result">
      <p>You scored {props.score}/{props.questionCount} correct answers</p>
      <button id="play-again" onClick={() => {props.cleanup(); props.next('home')}} type='button'>Play again</button>
    </div>
  }

  const rightAnswers = props.gameData.map(question => question.correct_answer)
  const score = Object.values(props.answers).filter(answer => rightAnswers.includes(answer)).length

  return (
    <div id="quiz">
      <img id="under" className="top-right" src="https://github.com/alexander-kazanski/quiz-app/blob/main/images/top-right.png?raw=true" />
      {Questions}
      <Result score={score} next={props.next} cleanup={props.cleanup} questionCount={props.gameData.length} />
      <img id="under" className="bottom-left" src="https://github.com/alexander-kazanski/quiz-app/blob/main/images/bottom-left.png?raw=true" />
    </div>
  )
}

export default Check;