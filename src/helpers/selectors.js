export function getAppointmentsForDay(state, day) {

  
  let daysArray = [];
  const appointmentsArray = [];
  
  for(let i = 0; i < state.days.length; i++){
    
    if(state.days[i].name === day){
      daysArray.push(state.days[i].appointments)
    }
  }
  daysArray = daysArray.reduce((a, b) => a.concat(b), []);

  for(let i = 0; i < daysArray.length; i++){

    appointmentsArray[i] = state.appointments[daysArray[i].toString()];
  }
  
  return appointmentsArray;
};


export function getInterview(state, interview) {
  
  if (!interview) {
    return null
  }

  let interviewObj = {};
  const interviewerID = interview['interviewer'].toString();

  interviewObj = {  "student": interview.student, 
                    "interviewer": state.interviewers[interviewerID] }

  return interviewObj;
};

export function getInterviewersForDay(state, day) {

   
   let daysArray = [];
   const interviewersArray = [];
   
   for(let i = 0; i < state.days.length; i++){
     
     if(state.days[i].name === day){
       daysArray.push(state.days[i].interviewers)
     }
   }
   daysArray = daysArray.reduce((a, b) => a.concat(b), []);
 
   for(let i = 0; i < daysArray.length; i++){
 
     interviewersArray[i] = state.interviewers[daysArray[i].toString()];
   }
   
   return interviewersArray;
 };