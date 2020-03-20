import "./styles.scss"
import React, { Fragment } from 'react'
import Header from "./Header.js"
import Show from "./Show.js"
import Empty from "./Empty.js"

export default function Appointment(props){
console.log("This is from appointment", props);

  // return (
  //   <Fragment>
  //     <Header time="12pm" />
  //     <article className="appointment">Hello form Appointment index.js</article>
  //     <Fragment>
  //       {props.interview ? <Show /> : <Empty />}
  //     </Fragment>
  //     </Fragment>

  // )

  return(

    <article className="appointment">
      <Header time={props.time} />
      {/* to do: might need to fill in show and empty components */}
      {props.interview ? <Show student={props.interview.student} interviewer={props.id} /> : <Empty onAdd={props.onAdd} />} 
    </article>
  )
}