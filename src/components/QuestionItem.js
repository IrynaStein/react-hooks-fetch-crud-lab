import React from "react";

function QuestionItem({ question, deleteQuestion, answerChanged }) {
  const { id, prompt, answers, correctIndex } = question;


  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
    deleteQuestion(question.id)
  }

  function handleChange(e) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "correctIndex": parseInt(e.target.value)
      })
    })
        .then(resp => resp.json())
        .then(data => answerChanged(data))
    }
  
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
