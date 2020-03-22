import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment"
import React, { useState, useEffect } from "react";
import { getAppointmentsForDay } from "helpers/selectors.js"

const axios = require('axios')


// /Users/bobby/lighthouse/scheduler/src/helpers/selectors.js

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];


// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "9pm",
//     interview: {
//       student: "Bobby",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "10pm",
//     interview: {
//       student: "Bob",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },  
//   {
//     id: 5,
//     time: "11pm",
//     interview: {
//       student: "Robert",
//       interviewer: {
//         id: 5,
//         name: "Sven Jones",
//         avatar: "https://i.imgur.com/twYrpay.jpg",
//       }
//     }
//   }
// ];





export default function Application(props) {


  
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  
  const setDay = day => setState({ ...state, day });

  
useEffect(() => {

  Promise.all([
    Promise.resolve(axios.get("/api/days")),
    Promise.resolve(axios.get("/api/appointments")),
  ]).then((all) => {
    setState(prev => ({ days: all[0].data, appointments: all[1].data}));
  });
}, [])


const appointments = getAppointmentsForDay(state, state.day);

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
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {appointments.map((appointment) => { return <Appointment key={appointment.id} {...appointment} />
        })
        }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
