import React from 'react';

function HomeScreen(props) {
    return (
        <div id="home">
            <img className="top-right" src="https://github.com/alexander-kazanski/quiz-app/blob/main/images/top-right.png?raw=true" />
            <h1>Quizzical</h1>
            <p>Some description if needed</p>
            <button onClick={() => props.next('quiz')} type="button">Start Quiz</button>
            <img className="bottom-left" src="https://github.com/alexander-kazanski/quiz-app/blob/main/images/bottom-left.png?raw=true" />
        </div>
    )
}

export default HomeScreen;