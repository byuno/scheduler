import "./styles.scss"
import React from 'react'
import Header from "./Header.js"
import Show from "./Show.js"
import Empty from "./Empty.js"
import useVisualMode from "hooks/useVisualMode.js"
import Form from "./Form.js"
import Status from "./Status.js"

//import {getInterviewersForDay} from "helpers/selectors.js"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props){
  console.log('appointment props', props)
  console.log('this is what interviewers in appointment looks like', props.interviewers);

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => {transition(SHOW)})
    .catch(function (error) {
      console.log(error);
  });
  }

  return (

    <article className="appointment">
      <Header time={props.time} />
   
      {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          
        />
      )}
      {mode === SAVING && <Status message="Saving!"/>}
      {mode === CREATE && (
        <Form
        interviewers={props.interviewers}
         onCancel={back}  
         onSave={save}  
        />
        )}


    </article>
  )
}