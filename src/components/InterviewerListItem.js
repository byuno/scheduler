import React from "react";
import './InterviewerListItem.scss'
import classnames from 'classnames';


export default function InterviewerListItem(props) {

  const interviewerClass = classnames(
    "interviewers", 
    {"interviewers__item--selected": props.selected}
  )
      


  return (
    <li className={interviewerClass} onClick={props.onChange}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
  
    </li>
  );
}