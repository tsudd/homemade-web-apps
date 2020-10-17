import React, { useState } from "react";
import "./App.css";
import { CHORDS } from "./shared/chords";

function App() {
  const [chosenChords, setChosenChords] = useState([]);

  return (
    <div className="wrapper">
      <div className="logo">
        <h1>ChordTrainer</h1>
      </div>
    </div>
  );
}

export default App;
