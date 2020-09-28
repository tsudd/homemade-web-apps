import React from "react";
import "./App.css";
import ChordList from "./components/CordlistComponent";
import { CHORDS } from "./shared/chords";

function App() {
  const chosenChords = CHORDS;

  return (
    <div className="wrapper">
      <div className="logo">
        <h1>ChordTrainer</h1>
      </div>
      <ChordList chords={chosenChords} />
    </div>
  );
}

export default App;
