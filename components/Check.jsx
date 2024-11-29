import React, { useEffect, useState } from 'react';
import "./check.css"


function QuestionAnswer({idx, answer, idName}) {
  return (
    <button key={idx}
      className="btn"
      id={idName} type="button">{answer}</button>
  )
}

const Question = React.memo(({ incorrectAnswers, grade, isFirst, question }) => {
  const {isCorrect, selectedAnswer, correct_answer} = grade
  // todo create function to randoomize where the correct answer is
  const Answers = incorrectAnswers.concat(correct_answer).map((answer, idx) => {
    const idName = () => {
      if (selectedAnswer === answer) {
        if (isCorrect) {
          localStorage.setItem('score', Number(localStorage.getItem('score')) + 1)
          return 'selected-correct';
        } else {
          return 'selected-wrong';
        }
      } else {
        if (selectedAnswer === answer) {
          return 'selected-wrong'
        } else if (correct_answer == answer) {
          // localStorage.setItem('score', Number(localStorage.getItem('score')) + 1)
          return 'selected-correct'
        }
        return 'ghost';
      }
    }
    return <QuestionAnswer key={idx} idx={idx} answer={answer} idName={idName()} />
})

  return (
    <section className={`question ${isFirst ? '' : 'first-question'}`}>
      <p className="title">{question}</p>
      <div className="answer">
        {Answers}
      </div>
    </section>
  )
})


function Check({ answers, gameData, setAnswers, next }) {
  const Questions = gameData.map((gameQuestion, idx) => {
    const { correct_answer, question, incorrect_answers } = gameQuestion;
    const grade = { 
      isCorrect: answers[question] === correct_answer,
      correct_answer,
      selectedAnswer: answers[question],
    }
    return (
      <Question
        grade={grade}
        key={idx}
        isFirst={idx === 0}
        setAnswers={setAnswers}
        question={question}
        incorrectAnswers={incorrect_answers}

      />
    )
  })

  function Result({ cleanup, total }) {
    return <div className="result">
      <p>You scored {localStorage.getItem('score')}/{total} correct answers</p>
      <button id="play-again" onClick={cleanup} type='button'>Play again</button>
    </div>
  }

  function cleanup() {
    setAnswers([]);
    next('home')
  }


  return (
    <div id="quiz">
      <img id="under" className="top-right" src="https://github.com/alexander-kazanski/quiz-app/blob/main/images/top-right.png?raw=true" />
      {Questions}
      <Result cleanup={cleanup} total={gameData.length} />
      <img id="under" className="bottom-left" src="https://github.com/alexander-kazanski/quiz-app/blob/main/images/bottom-left.png?raw=true" />
    </div>
  )
}

export default Check;