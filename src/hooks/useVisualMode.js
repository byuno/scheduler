import React, { useState } from "react";

export default function useVisualMode(initalMode){
  const [mode, setMode] = useState(initalMode);

  return {mode};
};