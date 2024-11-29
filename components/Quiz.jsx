import React, { useEffect } from 'react';
import Question from './Question';
import "./quiz.css"

function Quiz({ answers, setAnswers, gameData, next}) {
    
    const Questions = gameData.map((question, idx) => {
      return (
        <Question 
          selectedAnswer={answers[question.question]}
          key={idx} 
          {...question} 
          isFirst={idx === 0} 
          setAnswers={setAnswers} 
        />
      )
    })
    
    return (
        <div id="quiz">
            <img id="under" className="top-right" src="https://github.com/alexander-kazanski/quiz-app/blob/main/images/top-right.png?raw=true" />
            {Questions}
            <span>
              <button onClick={next} id="check-answers" type='button'>Check answers</button>
            </span>
            <img id="under" className="bottom-left" src="https://github.com/alexander-kazanski/quiz-app/blob/main/images/bottom-left.png?raw=true" />
        </div>
    )
}

export default Quiz;