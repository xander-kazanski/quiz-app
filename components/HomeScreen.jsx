import React, { useEffect } from 'react';


function HomeScreen({next, gameData, setGameData}) {

  useEffect(() => {
    if (localStorage.getItem('score')) {
      localStorage.removeItem('score')  
    }
    localStorage.setItem('score', 0);

  }, [])


  function CustomizeQuiz() {
    if (gameData && gameData.length) {
      return (
        <button onClick={next} type="button">
          Start Quiz
        </button> 
      )
    } 
  }


  return (
    <div id="home">
      <img className="top-right" src="https://github.com/alexander-kazanski/quiz-app/blob/main/images/top-right.png?raw=true" />
      <h1>Quizzical</h1>
      <p>Some description if needed</p>
      <CustomizeQuiz />
      <img className="bottom-left" src="https://github.com/alexander-kazanski/quiz-app/blob/main/images/bottom-left.png?raw=true" />
    </div>
  )
}

export default HomeScreen;