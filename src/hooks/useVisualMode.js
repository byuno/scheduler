import React, { useState } from "react";

export default function useVisualMode(initalMode){
  const [mode, setMode] = useState(initalMode);
  const [history, setHistory] = useState([initalMode]);

  
  const transition = function(newMode, replace = false) {
    let tempHistory = [...history];
    if(replace){
      tempHistory.pop();
    } 
    tempHistory.push(newMode);
    setMode(newMode);
    setHistory(tempHistory);
    };
  

  const back = function() {
    let tempHistory = [...history];

    // if(tempHistory.length !== 0){
    //   setMode(tempHistory.pop());
    //   setHistory(tempHistory.push(mode))
    // }
console.log('temp history', tempHistory)
    //to do simple back action
    if(tempHistory.length > 1){
console.log("if statement reached")
      tempHistory.pop()
      setMode(tempHistory[tempHistory.length-1]);
      setHistory(tempHistory);
    }
  };
  
  return {mode, transition, back};
};


/**?
 *   const transition = (changing, replace = false) => {
    let newHistory = [...history];
    if (replace) {
      newHistory.pop();
    }
    newHistory.push(changing);
    setMode(changing);
    setHistory(newHistory);
  };
 */