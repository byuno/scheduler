export function getAppointmentsForDay(state, day) {
 
  //wconsole.log('this is what stat.days looks like', state.days[0].name)
  
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