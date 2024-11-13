import React, { useState } from 'react';
import "./create-quiz.css"

function CreateQuiz(props) {
  const [data, setData] = useState([
    {
      "question": "Which of the following is True?",
      "correct_answer": "Sydney",
      "incorrect_answers": [
        "Cairo",
        "Moscow",
        "Beijing"
      ]
    }])
  function handleChange(event) {
    setData(JSON.parse(event.target.value));
  }

  const [open, setOpen] = useState(false);

  return <section id="create-quiz">
    <button type="button" onClick={() => setOpen(!open)}>Create quiz</button>
    <dialog open={open}>
      <p>Update Quiz:</p>
      <textarea onChange={handleChange}>{JSON.stringify(data, null, 2)}</textarea>
      <button type="button" onClick={() => {
        props.setGameData(data);
        setOpen(!open)
      }}>Close</button>
    </dialog>
  </section>
}

export default CreateQuiz;