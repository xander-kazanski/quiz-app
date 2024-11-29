import React, { useEffect, useState } from 'react';
import HomeScreen from './components/HomeScreen.jsx'
import Quiz from './components/Quiz.jsx'
import Check from './components/Check.jsx';
import "./index.css"
import { quizData } from './data.js';


function App() {
    const [step, setStep] = useState('home');
    const [gameData, setGameData] = useState(quizData);
    const [answers, setAnswers] = useState([])
    


    function currentStep() {
        switch (step) {
            case 'home':
                return <HomeScreen next={() => setStep('quiz')} gameData={gameData} setGameData={setGameData} />
            case 'quiz':
                return <Quiz answers={answers} gameData={gameData} setAnswers={setAnswers} next={() => setStep('check')} />
            case 'check':
                return <Check answers={answers} gameData={gameData} setAnswers={setAnswers} next={setStep} cleanup={setAnswers} />
            default:
                return <HomeScreen next={setStep} gameData={gameData} setGameData={setGameData} />
        }
    }
 
    return (
        <main>
          {currentStep()}
        </main>
    )
}

export default App;