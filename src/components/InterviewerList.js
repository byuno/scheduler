import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import './InterviewList.scss'
import classnames from 'classnames';

export default function InterviewerList(props) {



  const interviewers = props.interviewers.map(interviewer => {
    
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar ={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        
        setInterviewer={(event) => props.setInterviewer(interviewer.id)} 
        />
        )
        
      })
      
  return <ul className="interviewers__list">
    {interviewers}
  </ul>

}