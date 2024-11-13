import React from 'react';
import CreateQuiz from './CreateQuiz'

function HomeScreen(props) {
  console.log(props.gameData);
    return (
        <div id="home">
            <img className="top-right" src="https://github.com/alexander-kazanski/quiz-app/blob/main/images/top-right.png?raw=true" />
            <h1>Quizzical</h1>
            <p>Some description if needed</p>
            {props.gameData.length ? 
              <button onClick={() => props.next('quiz')} type="button">Start Quiz</button> :
              <CreateQuiz setGameData={props.setGameData} />}
            <img className="bottom-left" src="https://github.com/alexander-kazanski/quiz-app/blob/main/images/bottom-left.png?raw=true" />
        </div>
    )
}

export default HomeScreen;