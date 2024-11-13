import React from 'react';

function HomeScreen(props) {
    return (
        <div id="home">
            <img className="top-right" src="../images/top-right.png" />
            <h1>Quizzical</h1>
            <p>Some description if needed</p>
            <button onClick={() => props.next('quiz')} type="button">Start Quiz</button>
            <img className="bottom-left" src="../images/bottom-left.png" />
        </div>
    )
}

export default HomeScreen;