import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment"
import React, { useState, useEffect } from "react";
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors.js"
import useApplicationData from "hooks/useApplicationData.js"


const axios = require('axios')



export default function Application(props) {


  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // });
  
  // const setDay = day => setState({ ...state, day });
  
  // useEffect(() => {
    
  //   Promise.all([
  //     Promise.resolve(axios.get("/api/days")),
  //     Promise.resolve(axios.get("/api/appointments")),
  //     Promise.resolve(axios.get("/api/interviewers")),
  //   ]).then((all) => { 
  //     setState(prev => ({
  //       ...state, 
  //       days: all[0].data, 
  //       appointments: all[1].data, 
  //       interviewers: all[2].data})) 
  //       //console.log('this is what all[2].data looks like', all[2].data)
  //     })
  //   }, [])
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

//console.log("hey!!! part1")

//console.log("this is state", state);
    
    const appointments = getAppointmentsForDay(state, state.day);
  

    const interviewers = getInterviewersForDay(state, state.day);
    
    const schedule = appointments.map(appointment => {
      
      const interview = getInterview(state, appointment.interview);
      
      // console.log('Application - interview', interview)
      return (
        <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        />
        );
      });

      // function bookInterview(id, interview) {
      //   console.log(id, interview);
      //   const appointment = {
      //     ...state.appointments[id],
      //     interview: { ...interview }
      //   };
      //   const appointments = {
      //     ...state.appointments,
      //     [id]: appointment
      //   };
        
      //  return axios.put(`/api/appointments/${id}`, {interview})
      //     .then(response => {
      //       setState({
      //         ...state,
      //         appointments
      //       })
      //     })
      // };

      // function cancelInterview(id){
      //   console.log(id);
      //   const appointment = {
      //     ...state.appointments[id],
      //     interview: null
      //   };
      //   const appointments = {
      //     ...state.appointments,
      //     [id]: appointment
      //   };
        
      //  return axios.delete(`/api/appointments/${id}`)
      //     .then(response => {
      //       setState({
      //         ...state,
      //         appointments
      //       })
      //     })
      // };
      //console.log("hey!!!")
      //console.log(state.days);
      return (
    <main className="layout">
      <section className="sidebar">
        
        <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
      <DayList days={state.days} day={state.day} setDay={setDay} /> 

      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {schedule} 
        
        
        <Appointment key="last" time="5pm"  />
      </section>
    </main>
  );
}
