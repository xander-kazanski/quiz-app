import React, { useEffect, useState } from 'react';
import HomeScreen from './components/HomeScreen.jsx'
import Quiz from './components/Quiz.jsx'
import Check from './components/Check.jsx';
import "./index.css"


function App() {
    const [step, setStep] = useState('home');
    const [gameData, setGameData] = useState({});
    const [answers, setAnswers] = useState([])

 
    return (
        <main>
            {step === 'home' ? 
              <HomeScreen next={setStep} gameData={gameData} setGameData={setGameData} /> : 
                step === 'quiz' ? <Quiz answers={answers} 
                  gameData={gameData} setAnswers={setAnswers} next={setStep} /> :
                  <Check answers={answers} 
                  gameData={gameData} setAnswers={setAnswers} next={setStep} 
                  cleanup={() => {
                    setGameData({})
                    setAnswers([])
                  }}
                  /> }
        </main>
    )
}

export default App;