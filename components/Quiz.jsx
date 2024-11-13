import React, { useEffect } from 'react';
import "./quiz.css"

function Quiz(props) {
    
    function Question(props) {
      // todo create function to randoomize where the correct answer is
        const Answers = props.incorrect_answers.concat(props.correct_answer).map((answer, idx) => {
          return <button key={idx} onClick={() => props.setAnswers(function(prevAnswers) {
            return {
              ...prevAnswers,
              [props.question]: answer
            }
          })}
          className="btn" id={props.selectedAnswer === answer ? 'selected' : ''} type="button" 
          >{answer}</button>
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
    
    return (
        <div id="quiz">
            <img id="under" className="top-right" src="../images/top-right.png" />
            {Questions}
            <span>
              <button onClick={() => props.next("last")} id="check-answers" type='button'>Check answers</button>
            </span>
            <img id="under" className="bottom-left" src="../images/bottom-left.png" />
        </div>
    )
}

export default Quiz;