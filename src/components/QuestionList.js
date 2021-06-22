import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem"


function QuestionList() {
  const [questions, setQuestions] = useState([])

  const URL = "http://localhost:4000/questions"

  useEffect(() => {
    fetch(URL)
      .then(resp => resp.json())
      .then(data => setQuestions(data))
  }, [])


  function deleteQuestion(id) {
    const updatedQuestions = questions.filter((question) => question.id !== id)
    setQuestions(updatedQuestions)
  }

  function answerChanged(data) {
    console.log(data)
    const newAnswerChange = questions.map((question) => {
      if (question.id === data.id){
        return data
      }
      else {
        return question
      }
    })
    setQuestions(newAnswerChange)
  }

  console.log(questions)

  const getAQuestion = () => questions.map((question) => {
    return (
      <QuestionItem
        key={question.id}
        question={question}
        deleteQuestion={deleteQuestion}
        answerChanged={answerChanged}
      />
    )
  })
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {getAQuestion()}
      </ul>
    </section>
  );
}

export default QuestionList;
