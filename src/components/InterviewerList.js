import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import './InterviewList.scss'
import classnames from 'classnames';

export default function InterviewerList(props) {
//console.log(props)

  const interviewers = props.interviewers.map(interviewer => {
    
    return (
      
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        onChange={(event) => props.onChange(interviewer.id)} 
        />
      
    
        )
        
      })
      
  return <ul className="interviewers__list">
    {interviewers}
  </ul>

}