import React, { useState, useEffect } from "react";

import axios from 'axios'

export default function useApplicationData(){
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  // const getDayForAppointment = function(appointmentId){
  //   // Go through each day (from state.days)
  //   for(let i = 0; i < state.days.length; i++){
  //     let day = state.days[i];
  //     // then compare passed in appointmenID with appointments in the day.
  //     // then if there is a match, we now know where in the day array (dayId)
  //     if (day.appointments.includes(appointmentId)) {
  //       return day
  //     };
  //   }
  // }

  // const calculateSpotsForDay = function (oldDay) {
  //   // eg I have oldDay = {id: 1, name: "Monday", appointments: [1, 2, 3, 4, 5], interviewers: [4, 7, 1], spots: 2}
  //   // (I also have the state because scope)
  //   // eg I want the correct number of spots
  //   let spotCount = 0;

  //   // Go through the appointment during the day
   
  //   for (let i = 1; i < oldDay.appointments.length; i++){
  //     let appointmentInDay = oldDay.appointments[i];
  //     // Use the appointment from above to check if the corresponding appointment is in state.appointments
  //     // if interview is null,  then add to some counter, spotCount
  //     if(state.appointments[appointmentInDay]['interview'] === null){
  //       spotCount++; 
  //     }
  //   }
  //   return spotCount;
  // }



  function refresh() {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers")),
    ]).then((all) => { 
      setState(prev => ({
        ...prev, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data})) 
      })
    }

    useEffect(() => {
      refresh();
    }, []);

    function bookInterview(appointmentID, interview) {
      const appointment = {
        ...state.appointments[appointmentID],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [appointmentID]: appointment
      };

      // const oldDay = getDayForAppointment(appointmentID);
      // const newSpots = calculateSpotsForDay(oldDay);

      // const newDay = {
      //   ...oldDay,
      //   spots: newSpots,
      // };

      // const newDays = state.days.map(day => day.id === newDay.id ? newDay : day);

      return axios.put(`/api/appointments/${appointmentID}`, appointment)
        .then(() => {
          refresh();
          setState({
            ...state,
            appointments
            //days: newDays
          })
        })
    };

    function cancelInterview(appointmentID){
      const appointment = {
        ...state.appointments[appointmentID],
        interview: null
      };
      const appointments = {
        ...state.appointments,
        [appointmentID]: appointment
      };

      return axios.delete(`/api/appointments/${appointmentID}`)
     .then(() => {
       refresh();
        setState({
          ...state,
          appointments

        })
      })
    };



  return {state, setDay, bookInterview, cancelInterview}



};