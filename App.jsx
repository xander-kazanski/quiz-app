import React, { useEffect, useState } from 'react';
import HomeScreen from './components/HomeScreen.jsx'
import Quiz from './components/Quiz.jsx'
import Check from './components/Check.jsx';
import "./index.css"

const data = new Promise((resolve, reject) => {
  resolve({"response_code":0,"results":[{"type":"multiple","difficulty":"medium","category":"Geography","question":"Which of the following is NOT a capital city?","correct_answer":"Sydney","incorrect_answers":["Cairo","Moscow","Beijing"]},{"type":"multiple","difficulty":"easy","category":"General Knowledge","question":"Which of the following card games revolves around numbers and basic math?","correct_answer":"Uno","incorrect_answers":["Go Fish","Twister","Munchkin"]},{"type":"multiple","difficulty":"hard","category":"Science &amp; Nature","question":"Which moon is the only satellite in our solar system to possess a dense atmosphere?","correct_answer":"Titan","incorrect_answers":["Europa","Miranda","Callisto"]},{"type":"multiple","difficulty":"hard","category":"Entertainment: Video Games","question":"In the original DOOM (1993) which of the following is NOT a cheat code?","correct_answer":"IDCLIP","incorrect_answers":["IDFA","IDDQD","IDSPISPOPD"]},{"type":"multiple","difficulty":"easy","category":"Entertainment: Video Games","question":"In what year was the game &quot;Fallout&quot; released?","correct_answer":"1997","incorrect_answers":["1998","1999","1996"]},{"type":"multiple","difficulty":"hard","category":"Entertainment: Video Games","question":"Counting the Blood and Wine DLC, how many Hero Cards are there in total in The Witcher 3?","correct_answer":"25","incorrect_answers":["30","20","15"]},{"type":"multiple","difficulty":"medium","category":"Entertainment: Video Games","question":"In &quot;Call Of Duty: Zombies&quot;, which map features the &quot;Fly Trap&quot; easter egg?","correct_answer":"Der Riese","incorrect_answers":["Tranzit","Call Of The Dead","Shi No Numa"]},{"type":"multiple","difficulty":"medium","category":"Politics","question":"Which of the following Argentinian presidents was elected in 2015?","correct_answer":"Mauricio Macri","incorrect_answers":["Cristina Fernandez de Kirchner","Nestor Kirchner","Juan Domingo Peron"]},{"type":"boolean","difficulty":"easy","category":"Geography","question":"Rhode Island is actually located on the US mainland, despite its name.","correct_answer":"True","incorrect_answers":["False"]},{"type":"multiple","difficulty":"medium","category":"Geography","question":"Which of these is NOT a city in Saudi Arabia?","correct_answer":"Dubai","incorrect_answers":["Riyadh","Mecca","Medina"]}]})
})

function App() {
    const [step, setStep] = useState('home');
    const [gameData, setGameData] = useState({});
    const [answers, setAnswers] = useState([])

    useEffect(() => {
      data
        .then(data => {
          if (data.results && data.results.length)
          setGameData(data.results)
        }
        )
    }, [])

    const isLoaded = gameData.length > 0;
    
    if (!isLoaded) {
      return <p>App Loading...</p>
    }

    return (
        <main>
            {step === 'home' ? 
              <HomeScreen next={setStep} /> : 
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