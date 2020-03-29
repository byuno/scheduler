import "./styles.scss"
import React from 'react'
import Header from "./Header.js"
import Show from "./Show.js"
import Empty from "./Empty.js"
import useVisualMode from "hooks/useVisualMode.js"
import Form from "./Form.js"
import Status from "./Status.js"
import Confirm from "./Confirm.js"
import Error from "./Error.js"

//import {getInterviewersForDay} from "helpers/selectors.js"

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props){
  // console.log('appointment props', props)
  // console.log('this is what interviewers in appointment looks like', props.interviewers);

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
         .catch((error) => {transition(ERROR_SAVE, true)});
  }

  function cancel() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
         .then(() => {transition(EMPTY)})
         .catch((error) => {transition(ERROR_DELETE, true)});
  }

  //console.log('props.interview', props.interview)
  return (

    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
   
      {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {transition(CONFIRM)}}//{cancel}
          onEdit={() => {transition(EDIT)}}
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
        {mode === DELETING && <Status message="Deleting!"/>}
        {mode === CONFIRM && <Confirm message="Do you really want to delete?!"
                                      onConfirm={cancel}
                                      onCancel={back}/>}
        {mode === EDIT && <Form name={props.interview.student}
                                interviewer={props.interview.interviewer}
                                interviewers={props.interviewers}
                                onCancel={back}  
                                onSave={save}/>}
        {mode === ERROR_SAVE && <Error message="An error occured!" 
                                       onClose={back}/> }
        {mode === ERROR_DELETE && <Error message="An error occured!"
                                         onClose={back}/> }

    </article>
  )
}