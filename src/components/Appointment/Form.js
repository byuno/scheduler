import React, { useState } from "react";
import InterviewerList from "/Users/bobby/lighthouse/scheduler/src/components/InterviewerList.js";
import Button from "/Users/bobby/lighthouse/scheduler/src/components/Button.js"

export default function Form(props){
  //console.log(props);
 //const {interviewers, interviewer, onCancel, onSave, name} = props
 
 const [name, setName] = useState(props.name || "");
 const [interviewer, setInterviewer] = useState(props.interviewer || null);

 const reset = () => {
  setName("");
  setInterviewer(null);
}

const cancel = () => {
  reset();
  props.onCancel();
}

// For later onChange={(event) => setInterviewer(event.target.value)}
// setName(event.target.value)
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
          /*
            This must be a controlled component
          */
         value={name}
         onChange={(event) => setName(event.target.value)}
         data-testid="student-name-input"
          />
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={(interviewerID) => setInterviewer(interviewerID)} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() =>{props.onSave(name, interviewer)}}>Save</Button>
        </section>
      </section>
    </main>
  )
};


