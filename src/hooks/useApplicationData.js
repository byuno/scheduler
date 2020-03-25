import React, { useState, useEffect } from "react";

import axios from 'axios'

export default function useApplicationData(){
  //console.log(axios);
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });


  const resetState = (() => {
    //console.log('all1');

    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers")),
    ]).then((all) => { 
     // console.log('all2', all);
      setState(prev => ({
        ...prev, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data})) 
      })
    })

useEffect(resetState, [])

    function bookInterview(id, interview) {
     // console.log(id, interview);
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      
     return axios.put(`/api/appointments/${id}`, appointment)
        .then(resetState)
    };

    function cancelInterview(id){
      //console.log(id);
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      
     return axios.delete(`/api/appointments/${id}`)
     .then(resetState)
        // .then(response => {
        //   setState({
        //     ...state,
        //     appointments
        //   })
        // })
    };



return {state, setDay, bookInterview, cancelInterview}



};