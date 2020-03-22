import "./styles.scss"
import React from 'react'
import Header from "./Header.js"
import Show from "./Show.js"
import Empty from "./Empty.js"

export default function Appointment(props){

  return(

    <article className="appointment">
      <Header time={props.time} />
      {/* to do: might need to fill in show and empty components */}
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />} 
    </article>
  )
}