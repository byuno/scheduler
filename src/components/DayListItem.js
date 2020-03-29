import React from "react";
import './DayListItem.scss'
//import DayListItem from "components/DayListItem"
import classnames from 'classnames';

export default function DayListItem(props) {
 //console.log('props.spots', props.spots)

  const formatSpots = () => {
    let spotString = '';
    if (props.spots === 0) {
      spotString = 'no spots';
    } else if (props.spots === 1) {
      spotString = '1 spot';
    } else {
      spotString = `${props.spots} spots`;
    }

    return spotString + ' remaining';

  };
  
  const dayClass = classnames(
    "day-list__item", {
      "day-list__item--selected":props.selected,
      "day-list__item--full": props.spots === 0
    })
    
  return (
    <li data-testid="day" className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}