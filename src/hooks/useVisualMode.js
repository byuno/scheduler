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
  

  const back = function () {
    let tempHistory = [...history];

    if (tempHistory.length > 1) {
      tempHistory.pop()
      setMode(tempHistory[tempHistory.length - 1]);
      setHistory(tempHistory);
    }
  };

  return { mode, transition, back };
};
