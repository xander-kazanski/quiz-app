import React, { useEffect, useState } from 'react';
import "./check.css"

// Safe localStorage operations with error handling
const safeStorage = {
  getItem(key, defaultValue = 0) {
    try {
      const item = localStorage.getItem(key);
      return item ? Number(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading from localStorage: ${error.message}`);
      return defaultValue;
    }
  },
  setItem(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.warn(`Error writing to localStorage: ${error.message}`);
      return false;
    }
  }
};

// Shuffle function to randomize answer positions
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function QuestionAnswer({idx, answer, idName}) {
  return (
    <button 
      key={idx}
      className="btn"
      id={idName} 
      type="button"
      aria-label={`Answer option: ${answer}`}
      role="option"
    >
      {answer}
    </button>
  )
}

const Question = React.memo(({ incorrectAnswers, grade, isFirst, question }) => {
  const {isCorrect, selectedAnswer, correct_answer} = grade

  const shuffledAnswers = shuffleArray(incorrectAnswers.concat(correct_answer));

  const Answers = shuffledAnswers.map((answer, idx) => {
    const idName = () => {
      if (selectedAnswer === answer) {
        return isCorrect ? 'selected-correct' : 'selected-wrong';
      } else if (correct_answer === answer) {
        return 'selected-correct';
      }
      return 'ghost';
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
  const [score, setScore] = useState(0);

  // Calculate score whenever answers change
  useEffect(() => {
    const correctCount = gameData.reduce((count, gameQuestion) => {
      return count + (answers[gameQuestion.question] === gameQuestion.correct_answer ? 1 : 0);
    }, 0);
    setScore(correctCount);
  }, [answers, gameData]);

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
  });
  function Result({ cleanup, total }) {
    const getEmoji = (score, total) => {
      const percentage = (score / total) * 100;
      if (percentage === 100) return "🏆";
      if (percentage >= 80) return "🌟";
      if (percentage >= 60) return "😊";
      if (percentage >= 40) return "🌱";
      return "💪";
    };

    const getMessage = (score, total) => {
      const percentage = (score / total) * 100;
      if (percentage === 100) return "Perfect Score! Absolutely Brilliant!";
      if (percentage >= 80) return "Outstanding Performance!";
      if (percentage >= 60) return "Well Done!";
      if (percentage >= 40) return "Good Effort!";
      return "Keep Learning & Growing!";
    };

    return (
      <div className="result">
        <div className="result-emoji">{getEmoji(score, total)}</div>
        <h2>{getMessage(score, total)}</h2>
        <h2>You got <span className="score-highlight">{score}</span> out of <span className="score-highlight">{total}</span></h2>
        <button id="play-again" onClick={cleanup} type='button'>Play Again! 🎯</button>
      </div>
    );
  }

  function cleanup() {
    safeStorage.setItem('score', 0); // Reset score
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