import React, { useState } from "react";
import InterviewerLIst from "/Users/bobby/lighthouse/scheduler/src/components/InterviewerList.js";
import Button from "/Users/bobby/lighthouse/scheduler/src/components/Button.js"

export default function From(){

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
          /*
            This must be a controlled component
          */
          />
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger>Cancel</Button>
          <Button confirm>Save</Button>
        </section>
      </section>
    </main>
  )
};


