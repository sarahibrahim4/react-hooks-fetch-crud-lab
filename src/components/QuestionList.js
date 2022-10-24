import React, {useEffect, useState} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
const [questions, setQuestions]=useState([])

useEffect(()=>{
  const fetching = async()=>{
  const data = await fetch("http://localhost:4000/questions");
const json = await data.json();
setQuestions(json);
  }
  fetching();
},[])

function handleDelete(id){
  fetch(`http://localhost:4000/questions/${id}`,{
    method: "DELETE",
  })
  .then((resp)=>resp.json())
  .then(()=>{
    const updatedQuestions = questions.filter((item)=> item.id !== id)
    setQuestions(updatedQuestions)
  })
    }

    function updateQuestion(id, correctIndex){
      fetch(`http://localhost:4000/questions/${id}`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          correctIndex
        })
      })
      .then((resp)=>resp.json())
      .then((data)=>setQuestions(questions.map((question)=>{
        if(question.id===data.id)
        return data
        else {
          return question
        }
      })))
    }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul> 
      {questions.map((qt)=>(
<QuestionItem key={qt.id} question={qt} onDelteted={handleDelete}/>
      ))}
      </ul>
    </section>
  );
}

export default QuestionList;
