import React from "react";

function Question({
  selectedAnswer,
  isFirst,
  incorrect_answers,
  correct_answer,
  setAnswers,
  question
}) {
  // todo create function to randoomize where the correct answer is
  const answerArray = incorrect_answers.concat(correct_answer)
  const Answers = answerArray.map(
    (answer, idx) => {
      function handleClick() {
        setAnswers(prevAnswers => {
          return {
            ...prevAnswers,
            [question]: answer
          }
        })
      }
      const btnId = selectedAnswer === answer ? 'selected' : ''
      return (
        <button
          key={idx}
          onClick={handleClick}
          className="btn"
          id={btnId} type="button"
        >
          {answer}
        </button>
      )
    }
  )
  return (
    <section className={`question ${isFirst ? '' : 'first-question'}`}>
      <p className="title">{question}</p>
      <div className="answer">
        {Answers}
      </div>
    </section>
  )
}

export default Question;